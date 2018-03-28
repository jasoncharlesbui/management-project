const fetch = require("node-fetch");

program
    .version(package.version)
    .description(package.description)
    .option("--url [url]", "URL", "https://play.dhis2.org/demo")
    .option("--username [username]", "username", "admin")
    .option("--password [password]", "password", "district");

console.log(program);