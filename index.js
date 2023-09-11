// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  const currentDate = new Date();
  return res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  console.log(req.params);
  const isDateInvalid = (date) => new Date(date).toString() === "Invalid Date";

  if (isDateInvalid(parseInt(date))) {
    return res.json({ error: "Invalid Date" });
  }

  let dateObject;
  if (date.includes("-") || date.includes("GMT")) {
    const baseDate = new Date(date);

    dateObject = {
      unix: Date.parse(baseDate),
      utc: baseDate.toUTCString(),
    };
  } else {
    const baseDate = parseInt(date);

    dateObject = {
      unix: baseDate,
      utc: new Date(baseDate).toUTCString(),
    };
  }

  res.json(dateObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
