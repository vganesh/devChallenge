var express = require("express");
var path = require("path");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);


var salesData=[
    {"item":"2993","name":"Dani","count":"4","date":"20160206"},
    {"item":"7299","name":"Milki","count":"7","date":"20160206"},
    {"item":"299","name":"Dani","count":"4","date":"20160206"},
    {"item":"561","name":"Dani","count":"2","date":"20160206"},
    {"item":"7687","name":"Dani","count":"7","date":"20160206"},
    {"item":"1256","name":"Dani","count":"2","date":"20160206"},
    {"item":"7550","name":"Dani","count":"5","date":"20160206"},
    {"item":"5145","name":"Dani","count":"3","date":"20160206"},
    {"item":"806","name":"Milki","count":"5","date":"20160206"},
    {"item":"4529","name":"Milki","count":"3","date":"20160206"},
    {"item":"7965","name":"Milki","count":"7","date":"20160206"},
    {"item":"5892","name":"Dani","count":"2","date":"20160206"},
    {"item":"6863","name":"Milki","count":"5","date":"20160206"},
    {"item":"8533","name":"Milki","count":"4","date":"20160206"},
    {"item":"6762","name":"Dani","count":"6","date":"20160306"},
    {"item":"770","name":"Dani","count":"2","date":"20160306"},
    {"item":"6231","name":"Dani","count":"4","date":"20160306"},
    {"item":"8616","name":"Milki","count":"7","date":"20160306"},
    {"item":"7369","name":"Milki","count":"2","date":"20160306"},
    {"item":"3492","name":"Milki","count":"5","date":"20160306"},
    {"item":"1018","name":"Dani","count":"2","date":"20160306"},
    {"item":"3517","name":"Milki","count":"5","date":"20160306"},
    {"item":"7033","name":"Milki","count":"1","date":"20160306"},
    {"item":"8403","name":"Dani","count":"2","date":"20160306"},
    {"item":"7190","name":"Milki","count":"1","date":"20160306"},
    {"item":"2679","name":"Dani","count":"7","date":"20160306"},
    {"item":"23","name":"Milki","count":"6","date":"20160306"},
    {"item":"6758","name":"Milki","count":"6","date":"20160306"},
    {"item":"8208","name":"Dani","count":"2","date":"20160406"},
    {"item":"408","name":"Milki","count":"3","date":"20160406"},
    {"item":"6121","name":"Milki","count":"1","date":"20160406"},
    {"item":"7897","name":"Dani","count":"2","date":"20160406"},
    {"item":"8876","name":"Dani","count":"3","date":"20160406"},
    {"item":"8509","name":"Milki","count":"5","date":"20160406"},
    {"item":"281","name":"Milki","count":"6","date":"20160406"},
    {"item":"5683","name":"Milki","count":"2","date":"20160406"},
    {"item":"3668","name":"Milki","count":"5","date":"20160406"},
    {"item":"5198","name":"Dani","count":"3","date":"20160406"},
    {"item":"480","name":"Milki","count":"1","date":"20160406"},
    {"item":"1189","name":"Milki","count":"7","date":"20160406"},
    {"item":"2673","name":"Milki","count":"5","date":"20160406"},
    {"item":"8211","name":"Milki","count":"2","date":"20160406"},
    {"item":"1735","name":"Dani","count":"3","date":"20160506"},
    {"item":"2769","name":"Milki","count":"7","date":"20160506"},
    {"item":"3210","name":"Milki","count":"3","date":"20160506"},
    {"item":"5495","name":"Milki","count":"4","date":"20160506"},
    {"item":"1599","name":"Milki","count":"1","date":"20160506"},
    {"item":"5210","name":"Milki","count":"1","date":"20160506"},
    {"item":"1474","name":"Dani","count":"7","date":"20160506"},
    {"item":"5530","name":"Milki","count":"4","date":"20160506"},
    {"item":"3012","name":"Milki","count":"2","date":"20160506"},
    {"item":"6150","name":"Milki","count":"1","date":"20160506"},
    {"item":"330","name":"Milki","count":"4","date":"20160506"},
    {"item":"6909","name":"Dani","count":"1","date":"20160506"},
    {"item":"3969","name":"Milki","count":"1","date":"20160506"},
    {"item":"7302","name":"Dani","count":"3","date":"20160506"},
    {"item":"1208","name":"Milki","count":"6","date":"20160606"},
    {"item":"8603","name":"Milki","count":"2","date":"20160606"},
    {"item":"6811","name":"Milki","count":"5","date":"20160606"},
    {"item":"2857","name":"Dani","count":"6","date":"20160606"},
    {"item":"7885","name":"Dani","count":"3","date":"20160606"},
    {"item":"4681","name":"Milki","count":"5","date":"20160606"},
    {"item":"4724","name":"Dani","count":"6","date":"20160606"},
    {"item":"386","name":"Dani","count":"3","date":"20160606"},
    {"item":"7122","name":"Milki","count":"4","date":"20160606"},
    {"item":"2787","name":"Milki","count":"7","date":"20160606"},
    {"item":"2334","name":"Milki","count":"7","date":"20160606"},
    {"item":"1158","name":"Milki","count":"5","date":"20160606"},
    {"item":"4420","name":"Dani","count":"4","date":"20160606"},
    {"item":"7057","name":"Dani","count":"3","date":"20160606"},
    {"item":"2808","name":"Milki","count":"1","date":"20160706"},
    {"item":"762","name":"Dani","count":"2","date":"20160706"},
    {"item":"6133","name":"Dani","count":"2","date":"20160706"},
    {"item":"810","name":"Dani","count":"5","date":"20160706"},
    {"item":"2523","name":"Dani","count":"2","date":"20160706"},
    {"item":"5949","name":"Milki","count":"4","date":"20160706"},
    {"item":"2589","name":"Dani","count":"7","date":"20160706"},
    {"item":"218","name":"Milki","count":"3","date":"20160706"},
    {"item":"5923","name":"Dani","count":"1","date":"20160706"},
    {"item":"7252","name":"Dani","count":"3","date":"20160706"},
    {"item":"17","name":"Milki","count":"4","date":"20160706"},
    {"item":"7806","name":"Dani","count":"7","date":"20160706"},
    {"item":"5907","name":"Milki","count":"3","date":"20160706"},
    {"item":"1339","name":"Dani","count":"4","date":"20160706"},
    {"item":"6985","name":"Milki","count":"2","date":"20160806"},
    {"item":"6314","name":"Dani","count":"5","date":"20160806"},
    {"item":"8614","name":"Dani","count":"4","date":"20160806"},
    {"item":"887","name":"Milki","count":"7","date":"20160806"},
    {"item":"1055","name":"Dani","count":"3","date":"20160806"},
    {"item":"8003","name":"Milki","count":"4","date":"20160806"},
    {"item":"3361","name":"Dani","count":"3","date":"20160806"},
    {"item":"7612","name":"Dani","count":"5","date":"20160806"},
    {"item":"7852","name":"Dani","count":"7","date":"20160806"},
    {"item":"8186","name":"Dani","count":"3","date":"20160806"},
    {"item":"8429","name":"Milki","count":"6","date":"20160806"},
    {"item":"7687","name":"Dani","count":"2","date":"20160806"},
    {"item":"5379","name":"Milki","count":"2","date":"20160806"},
    {"item":"748","name":"Milki","count":"5","date":"20160806"}
];

var app = express();
app.use(express.static(path.join(__dirname,"/static")));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));


app.get('/salesData', function (req, res) {
    // console.log('dailySales ');
    res.send({status: 'success', salesData: salesData});
})

app.listen(8000,function(){
    console.log("Listening on Port: ", 8000);
})


