const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName; // their names
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https:\\us17.api.mailchimp.com/3.0/lists/3b825787b7"

  const options = {
    method: "POST",
    auth: "Cosmin:b4ca07eee21f8c41fc5fb5ad30e5d8b6-us17"
  }

  const request = https.request(url, options, function(response){

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

    if (response.statusCode === 200) res.sendFile(__dirname + "/success.html");
    else res.sendFile(__dirname + "/failure.html");

  });

  request.write(jsonData);
  request.end();

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});

/// API
/// b4ca07eee21f8c41fc5fb5ad30e5d8b6-us17

/// list id 3b825787b7
