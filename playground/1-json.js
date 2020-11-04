const fs = require("fs");

const dataBuffer = fs.readFileSync("1-json.json");
let dataJSON = dataBuffer.toString();

let dataObj = JSON.parse(dataJSON);

dataObj.name = "Prajapat";
dataObj.age = 51;

dataJSON = JSON.stringify(dataObj);

fs.writeFileSync("1-json.json", dataJSON);
