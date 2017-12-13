var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/flowers-all', function(req, res) {
    knex.raw('select * from flowers')
    .then(function(data){
        res.send(data);
    })
});
app.get('/flowers/:flowersId', function(req, res) {
    knex.raw('select genus, species, comname from flowers where comname = "' + req.params.flowersId +'"')
    .then(function(data){
        res.send(data);
    })
});

app.get('/sightings-slp/:flowersId', function(req, res) {
    knex.raw('select sighted, location, person from flowers \
    join sightings \
    on comname = name where comname = "' + req.params.flowersId +'"\
    order by sighted desc\
    limit 10')
    .then(function(data){
        res.send(data);
    })
});

app.post('/sightings', function(req, res) {
  knex.raw('insert into sightings(name, person, location, sighted) \
  values("' + req.body.name +'", "' + req.body.person + '", \
  "' + req.body.location + '", "' + req.body.sighted + '")')
  .then(function(id){
    res.redirect('/');
  });
});

app.post('/sighted/:flower', function(req, res) {
    console.log(req);
    console.log(req.params.flower);
    console.log(req.body.NAME);
    knex.raw('UPDATE SIGHTINGS \
    SET NAME = "' + req.body.NAME + '" \
    WHERE NAME = "' + req.params.flower + '"')
    .then(function(id){
      res.redirect('/');
    });
});

app.post('/updateFlower/:flowerId', function(req,res){
    knex.raw('UPDATE FLOWERS \
    SET COMNAME = "' + req.body.COMNAME + '" ,\
    GENUS = "' + req.body.GENUS + '" ,\
    SPECIES = "' + req.body.SPECIES + '"\
     WHERE COMNAME = "' + req.params.flowerId +'"')
    .then(function(id){
    });
  });
app.listen(3000, function(){
  console.log('listening on port 3000');
});