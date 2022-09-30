const express = require("express");

const app = express();

const session = require("express-session");

const sessionOptions = {
  secret: "thisisnotagodsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

app.get("/viewcount", (req, res) => {
  //If it exists...
  if (req.session.count) {
    req.session.count++;
    //If it doesn't, create it
  } else {
    req.session.count = 1;
  }
  res.send(`You have visited our page ${req.session.count} times!`);
  console.log(req.session.count);
});

app.get("/register", (req, res) => {
  const { username = "Anonymous User" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Hello and welcome back, ${username}`);
});

app.listen(3200, () => {
  console.log("PORT 3200 ACTIVE");
});
