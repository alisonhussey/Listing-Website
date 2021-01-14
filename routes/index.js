const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Cookie set up
    const templateVars = {
      user: req.session.userId
    };
    // console.log("Template Variables are:", templateVars);
    //console.log(req.session)
    res.render("index", templateVars);
});
  return router;
};
