const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.userId
    };
    //We don't have this page in views yet
    res.render("favourites", templateVars);
});
  return router;
};
