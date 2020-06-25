var express = require('express');
var PiCamera = require('pi-camera');
var app = express();

// Enable HTML template middleware
app.engine('html', require('ejs').renderFile);

app.use(express.static('styles'));
app.use('/data', express.static('/data/'));

app.get('/', function (req, res) {
  res.render('index.html');
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {
  var port = server.address().port;
  console.log('Http server listening on port ', port);
});

// Camera related functions
const myCamera = new PiCamera({
  mode: 'photo',
  output: `/data/image.jpg`,
  width: 1024,
  height: 576,
  nopreview: true,
});

setInterval(function() {

  myCamera.snap()
  .then((result) => {
    // Your picture was captured
    console.log("photo captured data/image.jpg " );
  })
  .catch((error) => {
     // Handle your error
     console.error("photo error " + error );
  });

}, 4000)

