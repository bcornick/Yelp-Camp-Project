const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

const app = express();

main()
  .then(() => console.log("DATABASE CONNECTION OPEN"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
