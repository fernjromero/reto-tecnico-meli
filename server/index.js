// Require express module
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('./models/UrlShorten');
const mongoURI = "mongodb://localhost/url-shortener";
const connectOptions = { 
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  keepAlive: true, 
  reconnectTries: Number.MAX_VALUE 
}; 
//Connect to MongoDB 
mongoose.Promise = global.Promise; 
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
  if (err) console.log(`Error`, err); 
  console.log(`Connected to MongoDB`); 
}); 
const app = express();
app.use(bodyParser.json());
const PORT = 7000;
//Start server on Port 7000
app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});
require("./routes/urlshorten")(app);