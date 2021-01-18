fs = require("fs");
const interests = require("./interestsArray");
const googleColors = require("./googleColors");

let str = "";
interests.map((item, idx) => {
  str +=
    "INSERT INTO `interests`(`interest`, `color`, `popularity`) VALUES (" +
    '"' +
    item +
    '"' +
    "," +
    '"' +
    googleColors[idx % googleColors.length] +
    '"' +
    "," +
    0 +
    ");\n";
});

fs.writeFile("helloworld.txt", str, function (err) {
  if (err) return console.log(err);
  console.log("Hello World > helloworld.txt");
});
