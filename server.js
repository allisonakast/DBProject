var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/flowers-all', function(req, res) {
    knex.raw('select comname from flowers')
    .then(function(data){
        res.send(data);
    })
});

app.get('/flowers/:flowersId', function(req, res) {
    knex.raw('select sighted, location, person from flowers \
    join sightings \
    on comname = name where comname = "' + req.params.flowersId +'"\
    order by sighted desc\
    limit 10')
    .then(function(data){
        res.send(data);
    })
});

app.post('/flowers', function(req, res) {
  knex.raw('insert into sightings(name, person, location, sighted) \
  values("' + req.body.name +'", "' + req.body.person + '", \
  "' + req.body.location + '", "' + req.body.sighted + '")')
  .then(function(id){
    res.redirect('/');
  });
});

app.put('/flowers/:flowerId', function(req, res) {
    knex('sightings').insert(req.body)
    .then(function(id){
      res.redirect('/');
    });
  });

app.listen(3000, function(){
  console.log('listening on port 3000');
});