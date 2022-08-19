#!/usr/bin/env node
import chalk from "chalk";
import fetch from "node-fetch";

if (process.argv[2]) {

    var IP = process.argv[2];
}

async function getAPIData() {

    const res = await fetch(
        `http://ip-api.com/json/${IP}?fields=29058809`
    );

    const data = await res.json();

    const status = data.status;
    const continent = data.continent;
    const lat = data.lat;
    const long = data.lon;
    const city = data.city;
    const zip = data.zip;
    const currency = data.currency;
    const isp = data.isp;
    const region = data.regionName;

    console.log(chalk.bgGreenBright("Continent:"));
    console.log(chalk.bgRedBright(continent));
    console.log(chalk.bgGreenBright("Latitude:"));
    console.log(chalk.bgRedBright(lat));
    console.log(chalk.bgGreenBright("Longditude:"));
    console.log(chalk.bgRedBright(long));
    console.log(chalk.bgGreenBright("Region:"));
    console.log(chalk.bgRedBright(region));
    console.log(chalk.bgGreenBright("City:"));
    console.log(chalk.bgRedBright(city));
    console.log(chalk.bgGreenBright("ZIP Code:"));
    console.log(chalk.bgRedBright(zip));
    console.log(chalk.bgGreenBright("Local Currency:"));
    console.log(chalk.bgRedBright(currency));
    console.log(chalk.bgGreenBright("ISP:"));
    console.log(chalk.bgRedBright(isp));
    console.log(chalk.bgGreenBright("Local Currency:"));
    console.log(chalk.bgRedBright(currency));
}

await getAPIData();