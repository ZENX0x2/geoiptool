#!/usr/bin/env node
'use strict';
import chalk from "chalk";
import fetch from "node-fetch";
import inquirer from "inquirer";

if (process.argv[2]) {

    var IP = process.argv[2];
}
else
{
    console.log(chalk.bgBlack("Required argument is missing!"));
    process.exit(1);
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

async function statusMessage() {
    console.log(chalk.bgBlue(status));

    if (message == "undefined") 
    {
        console.log(chalk.blue(message));
    }

}    

async function selectCategory() {

    const categories = await inquirer.prompt({
        name: "categories",
        type: "list",
        message: "Select a category\n",
        choices: [
            "General",
            "Geolocation",
            "Time information",
            "Device information",
            "ISP information",
        ],
    }).then((answers) => {
        switch (answers.categories) {
            case "General":
                quickChoice();
                break;
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
    console.log(chalk.green("Geolocation: \n"));
    console.log(chalk.red("Latitude: " + lat));
    console.log(chalk.red("Longditude: " + lon));
    console.log(chalk.red("Continent: " + continent));
    console.log(chalk.red("Continent Code: " + continentCode));
    console.log(chalk.red("Country: " + country));
    console.log(chalk.red("Country code: " + countryCode));
    if (district != "") {
        console.log(chalk.red("District: " + district));
    }
    console.log(chalk.red("Region Code: " + region));
    console.log(chalk.red("Region Name: " + regionName));
    console.log(chalk.red("City: " + city));
    console.log(chalk.red("ZIP Code: " + zip));
    console.log(chalk.red("Currency: " + currency));
}

async function timeInformation() {
    console.log(chalk.green("Time information: \n"));
    console.log(chalk.red("Timezone: " + timezone));
    console.log(chalk.red("UTC DST offset (seconds): " + offset));
}

async function deviceInformation() {
    console.log(chalk.green("Device information: \n"));
    console.log(chalk.red("Mobile device: " + mobile));
    console.log(chalk.red("Proxy: " + proxy));
    if (reverse != "")
    {
        console.log(chalk.red("Reverse: " + reverse));
    }
    console.log(chalk.red("Hosting: " + hosting));
}

async function ispInformation() {
    console.log(chalk.red("IP address: " + query));
    console.log(chalk.green("IP information: \n"));
    console.log(chalk.red("ISP name: " + isp));
    console.log(chalk.red("Organization: " + org));
    console.log(chalk.red("AS: " + as));
    console.log(chalk.red("AS name: " + asname));
}

async function quickChoice()
{
    console.log(chalk.red("Country: " + country));
    console.log(chalk.red("City: " + city));
    console.log(chalk.red("Timezone: " + timezone));
    console.log(chalk.red("Currency: " + currency));
    console.log(chalk.red("ISP name: " + isp));
}

await statusMessage();
await selectCategory();