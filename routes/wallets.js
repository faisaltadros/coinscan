const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/mgR4uAAekM6ZSecEV8YA9ZYHQvMdqRWdnP", async function(req, res) {
  await request("https://api.myjson.com/bins/m4w05", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      const walletJSON = JSON.parse(body);
      res.send(walletJSON.data);
    } else {
      console.log(error);
    }
  });
});

router.get("/mmyd1CeSxxPuQB8JXbrgXucG5pP3M5JHGn", function(req, res) {
  request("https://api.myjson.com/bins/aaeop", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const walletJSON = JSON.parse(body);
      res.send(walletJSON);
    } else {
      console.log("Error parsing JSON");
    }
  });
});

router.get("/msNRW6K5g5VagPFCyihmX47zE4fh9NoVn3", function(req, res) {
  request("https://api.myjson.com/bins/c9dgx", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const walletJSON = JSON.parse(body);
      res.send(walletJSON);
    } else {
      console.log("Error parsing JSON");
    }
  });
});

router.get("/mi4BnbVd1TFVrbpaGbimduQirwWBNwKSny", function(req, res) {
  request("https://api.myjson.com/bins/k00c1", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const walletJSON = JSON.parse(body);
      res.send(walletJSON);
    } else {
      console.log("Error parsing JSON");
    }
  });
});

router.get("/mgALHtP9CNDbtbYXRdzjj7Lu5D8xBnZxr8", function(req, res) {
  request("https://api.myjson.com/bins/f8jht", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const walletJSON = JSON.parse(body);
      res.send(walletJSON);
    } else {
      console.log("Error parsing JSON");
    }
  });
});

module.exports = router;
