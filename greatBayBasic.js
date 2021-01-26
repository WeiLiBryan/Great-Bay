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
        // inquirer prompt item submit, name, category, starting bid
        postAuction();
      }
      else {
        // console log all item names to inquirer and 
        bidAuction();
      }
    });
}

function bidAuction() {
  const items = [];
  connection.query("SELECT item_name FROM auctions", async function(err, res) {
    if (err) throw err;

    for (let i=0; i<res.length; i++){
      items.push(res[i].item_name);
    }
    
    let itemChoice = await bidChoice(items);
    
    // connection.end();
  }); 
}

function bidChoice(items) {
  // console.log(items);
  return inquirer.prompt({
    name: "item",
    type: "list",
    message: "Which item would you like to bid on?",
    choices: items
  });
}