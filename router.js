var express = require("express");
var router = express.Router();

const credentials = {
  email: "admin@gmail.com",
  password: "admin@123",
};
// login user
router.post("/login", (req, res) => {
  if (
    req.body.email == credentials.email &&
    req.body.password == credentials.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
    // res.end("login Sucessful");
  } else {
    res.end("Invalid Username or Password");
  }
});

// route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.send("Unauthorized User");
  }
});

// route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", { title: "Express", logout: "logout Sucessfully" });
    }
  });
});

module.exports = router;
