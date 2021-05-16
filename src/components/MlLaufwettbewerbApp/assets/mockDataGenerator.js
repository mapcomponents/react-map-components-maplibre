var data = [];
for (var i = 0; i < 1000; i++) {
  let dateTmp = new Date();
  dateTmp.setDate(dateTmp.getDate() + Math.round((Math.random() * 1000) % 30));

  data.push({
    user_id: Math.round((Math.random() * 1000) % 40),
    date:
      dateTmp.getFullYear() +
      "-" +
      ("0" + (dateTmp.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateTmp.getDate()).slice(-2),
    distance: Math.round((Math.random() * 1000) % 100) / 10,
  });
}
