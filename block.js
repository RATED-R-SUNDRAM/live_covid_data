var express = require("express");
var today = new Date();
var es6renderer = require("express-es6-template-engine");
var today = new Date();
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var fetch = require("node-fetch")
var path = require("path");

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("home")

});
app.get("/sdetails", (req, res) => {
    res.render("sdetails")
});
app.get("/ddetails", (req, res) => {
    res.render("ddetails")
});
app.get("/country", (req, res) => {
    fetch("https://api.covidindiatracker.com/total.json").then(response => response.json())
        .then((body) => {
            res.render("dresults", {
                city: "INDIA",
                date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "and" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                totalt: body.cChanges,
                activet: body.rChanges,
                deathst: body.dChanges,
                total: body.confirmed,
                active: body.active,
                recovered: body.recovered,
                deaths: body.deaths,

            })
        }).catch((err) => { res.render("err", { err: "WEAK NETWORK DETECTED OR WRONG CREDENTIALS ENTERED" }) })
});

app.post("/daal", urlencodedParser, (req, res) => {
    fetch("https://api.covid19india.org/state_district_wise.json").then(response => response.json())
        .then((body) => {
            var k = req.body.dist;
            var l = req.body.state;
            res.render("dresults", {
                city: k,
                date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "and" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                totalt: body[l].districtData[k].delta.confirmed,
                activet: body[l].districtData[k].delta.recovered,
                deathst: body[l].districtData[k].delta.deceased,
                total: body[l].districtData[k].confirmed,
                active: body[l].districtData[k].active,
                recovered: body[l].districtData[k].recovered,
                deaths: body[l].districtData[k].deceased,

            })
        }).catch((err) => { res.render("err", { err: " wrong credentials entered" }) })
});
app.post("/jaal", urlencodedParser, (req, res) => {
    fetch("https://api.rootnet.in/covid19-in/stats/latest").then(response => response.json())
        .then((body) => {
            body.data.regional.forEach(element => {
                if (element.loc == req.body.state) {
                    res.render("sresults", {
                        city: req.body.state,
                        date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " and " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                        total: element.totalConfirmed,
                        active: element.totalConfirmed - element.discharged - element.deaths,
                        recovered: element.discharged,
                        deaths: element.deaths,



                    })
                }
            })




        }).catch((err) => { res.render("err", { err: " wrong credentials entered" }) });
});
app.listen(4000 || process.env.PORT)