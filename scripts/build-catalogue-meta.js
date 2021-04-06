const glob = require("glob");
const fs = require("fs");

let options = {};
let mc_meta = {};

glob("src/components/**/*.meta.json", options, function (er, files) {
  console.log(files);

  for (var i = 0, len = files.length; i < len; i++) {
    let rawdata = fs.readFileSync(files[i]);
    let metaObj = JSON.parse(rawdata);
    mc_meta[metaObj.name] = metaObj;
  }

  let data = JSON.stringify(mc_meta);
  fs.writeFileSync("public/catalogue/mc_meta.json", data);
});
