const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Cookie set up
    const templateVars = {
      user: req.session.userId
    };
    console.log("HELLLOOOOOOOOOOOOOOOO");
    console.log(req.session);
    // console.log("Template Variables are:", templateVars);
    res.render("index", templateVars);
});
  return router;
};
