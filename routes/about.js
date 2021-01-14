const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.userId
    };
    res.render("about", templateVars);
});
  return router;
};
