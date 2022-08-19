#!/usr/bin/env node
'use strict';

import chalk from "chalk";
import fetch from "node-fetch";
import inquirer from "inquirer";

if (process.argv[2]) {

    var IP = process.argv[2];
}

const res = await fetch(
    `http://ip-api.com/json/${IP}?fields=66846719`
);

const data = await res.json();

const { status, message, continent, 
    continentCode, 
    country, countryCode, 
    region, regionName, city, 
    district, zip, lat, 
    lon, timezone, offset, 
    currency, isp, org, 
    as, asname, reverse, 
    mobile, proxy, hosting, 
    query } = data;

async function selectCategory() {

    const categories = await inquirer.prompt({
        name: "categories",
        type: "list",
        message: "Select a category\n",
        choices: [
            "Geolocation",
            "Time information",
            "Device information",
            "ISP information",
        ],
    }).then((answers) => {
        switch (answers.categories) {
            case "Geolocation":
                geolocation();
                break;
            case "Time information":
                timeInformation();
                break;
            case "Device information":
                deviceInformation();
                break;
            case "ISP information":
                ispInformation();
                break;
        }
    });
}

async function geolocation() {
    console.log(chalk.greenBright("Geolocation: \n"));
    console.log(chalk.redBright("Latitude: " + lat));
    console.log(chalk.redBright("Longditude: " + lon));
    console.log(chalk.redBright("Continent: " + continent));
    console.log(chalk.redBright("Country: " + country));
    console.log(chalk.redBright("Country code: " + countryCode));
    console.log(chalk.redBright("District: " + district));
    console.log(chalk.redBright("Region: " + regionName));
    console.log(chalk.redBright("City: " + city));
    console.log(chalk.redBright("ZIP Code: " + zip));
    console.log(chalk.redBright("Currency: " + currency));
}

async function timeInformation() {
    console.log(chalk.greenBright("Time information: \n"));
    console.log(chalk.redBright("Timezone: " + timezone));
    console.log(chalk.redBright("UTC DST offset (seconds): " + offset));
}

async function deviceInformation() {
    console.log(chalk.greenBright("Device information: \n"));
    console.log(chalk.redBright("Mobile device: " + mobile));
    console.log(chalk.redBright("Proxy: " + proxy));
    console.log(chalk.redBright("Reverse: " + reverse));
    console.log(chalk.redBright("Hosting: " + hosting));
}

async function ispInformation() {
    console.log(chalk.redBright("IP address: " + query));
    console.log(chalk.greenBright("IP information: \n"));
    console.log(chalk.redBright("ISP name: " + isp));
    console.log(chalk.redBright("Organization: " + org));
    console.log(chalk.redBright("AS name: " + asname));
}

await selectCategory();