var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "greatBay_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}


function postAuction() {
  inquirer
    .prompt({
      type: "input",
      name: "item_name",
      message: "What would you like to post?",
    },
    {
      type: "input",
      name: "category",
      message: "What category is your item?"
    },
    {
      type: "input",
      name: "starting_bid",
      message: "What is the starting bid for your item?"
    })
    .then(function createProduct() {
      console.log("Adding new item..\n");
      var query = connection.query(
        "INSERT INTO auctions SET ?",
      {
        item_name: res.item_name,
        category: res.category,
        starting_bid: res.starting_bid
      },
      function(err, res) {
        console.log(res.affectedRows + " product added!\n");
        start();
      })
    })
}

