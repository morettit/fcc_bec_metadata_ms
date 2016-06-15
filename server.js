var express = require('express');
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.set('views', __dirname + '/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/',function(req,res) {
	res.render('default.html');
});

app.post('/upload', upload.single('MyFile'), function(req,res,next) {
  var file = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  console.log(file);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(file));
  res.end();
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});