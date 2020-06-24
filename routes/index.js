var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROUTE ROUTE
router.get("/", (req, res) => {
  res.render("landing");
});

// =============
//  AUTH ROUTES
// =============

//SHOW REGISTER FORM
router.get("/register", (req, res) => {
  res.render("register", {page: 'register'});
});

//SIGN UP LOGIC
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
    if(req.body.adminCode === 'alientechbook') {
      newUser.isAdmin = true;
    }
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render("register", {error: err.message});
  }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Hello "+ user.username + ", you can now contribute to TechBook.")
      res.redirect("/campgrounds");
    });
  });
});

//SHOW LOGIN FORM
router.get("/login", (req, res) => {
  res.render("login", {page: 'register'});
});

//LOGIN ROUTE
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Good to see you again!"

  }),
  (req, res) => {}
);


//LOG OUT
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out successfully. See you later!")
  res.redirect("/campgrounds");
});

module.exports = router;
