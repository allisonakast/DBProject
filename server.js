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

app.put('/sighted/:flowerId', function(req, res) {
    knex('sightings').insert(req.body)
    .then(function(id){
      res.redirect('/');
    });
});

app.post('/updateFlower/:flowerId', function(req,res){
    console.log(req.params.flowerId);
    knex.raw('update flowers set genus = "' + req.body.genus +'", species = "'+ req.body.genus +'", comname =  "' + req.body.comname + '" where comname = "' + req.params.flowerId +'"')
    .then(function(id){
      res.redirect('/');
    });
  });
/* 
app.put('/updateFlower/:flowerId', function(req, res) {
    knex('flowers').update(req.body)
    .then(function(id){
      res.redirect('/');
    });
});
*/
app.listen(3000, function(){
  console.log('listening on port 3000');
});