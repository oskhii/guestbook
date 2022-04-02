//Enables express
var express = require("express");
var app = express();
//Enables fs
var fs = require("fs");
//Enables body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Takes the public folder in use
app.use(express.static(__dirname + "/public"));

//Sends frontpage.html to the path "/"
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/frontpage.html");
});
//Sends guestbook.html to the path "/guestbook"
app.get("/guestbook", function (req, res) {
    res.sendFile(__dirname + "/public/guestbook.html");
});
//Sends successfulmessage.html to the path "/success"
//This is used after the user submits the form on path "/newmessage"
app.get("/success", function(req, res) {
    res.sendFile(__dirname + "/public/successfulmessage.html");
});
//Sends newmessage.html to the path "/newmessage"
app.get("/newmessage", function (req, res) {
    res.sendFile(__dirname + "/public/newmessage.html");
});
//Saves the form data from the /newmessage page to a json file
app.post("/newmessage", function (req, res) {
    var data = require(__dirname + "/public/messages.json");

    data.push({
        "Name": req.body.name,
        "Country": req.body.country,
        "Message": req.body.message,
        "Date": new Date().toDateString()
    });

    var jsonStr = JSON.stringify(data, null, 2);

    fs.writeFile(__dirname + "/public/messages.json", jsonStr, err => {
        if (err) throw err;
        console.log("It's saved!");
    });
    //Redirect to path "/success" when the form is successfully submitted
    res.redirect("/success");
});
//Sends error message in case the user navigates to path which doesn't exist
app.get("*", function (req, res) {
    res.status(404).send("Error, cannot find page!");
});

//Enables server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    //Sends a message in the console that the server is running
    console.log("The guestbook app is running on port %d", PORT);
});