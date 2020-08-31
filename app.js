var express = require("express");
var today = new Date();
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var fetch = require("node-fetch")
fetch("https://api.covid19india.org/state_district_wise.json").then(response => response.json())
    .then((body) => {

        var k = [
            'State Unassigned',
            'Andaman and Nicobar Islands',
            'Andhra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chandigarh',
            'Chhattisgarh',
            'Delhi',
            'Dadra and Nagar Haveli and Daman and Diu',
            'Goa',
            'Gujarat',
            'Himachal Pradesh',
            'Haryana',
            'Jharkhand',
            'Jammu and Kashmir',
            'Karnataka',
            'Kerala',
            'Ladakh',
            'Lakshadweep',
            'Maharashtra',
            'Meghalaya',
            'Manipur',
            'Madhya Pradesh',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Punjab',
            'Puducherry',
            'Rajasthan',
            'Sikkim',
            'Telangana',
            'Tamil Nadu',
            'Tripura',
            'Uttar Pradesh',
            'Uttarakhand',
            'West Bengal'
        ]
        var l = [];

        k.forEach((item) => {
            l.push(Object.keys(body[item].districtData))
        })
        console.log(l)
    })