const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Cookie set up
    // const templateVars = {
    //   user: req.session["userName"]
    // };
    // console.log("Template Variables are:", templateVars);
    res.render("index"/*, templateVars*/);
});
  return router;
};
