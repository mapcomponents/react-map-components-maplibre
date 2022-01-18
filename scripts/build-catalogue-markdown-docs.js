const glob = require("glob");
const fs = require("fs");
var showdown = require("showdown");

let options = {};

function getComponentNameFromPath(path) {
  let tmp = path.split("/");
  tmp = tmp[tmp.length - 1];
  tmp = tmp.split(".doc");
  return tmp[0];
}

const converter = new showdown.Converter();

glob("src/components/**/*.doc.*.md", options, function (er, files) {
  console.log(files);

  for (var i = 0, len = files.length; i < len; i++) {
    let language = files[i].slice(-5, -3);
    let rawdata = fs.readFileSync(files[i]);
    let html = converter.makeHtml(rawdata + "");
    fs.writeFileSync(
      "public/catalogue/" + getComponentNameFromPath(files[i]) + "." + language + ".html",
      html
    );
  }
});
