$(document).ready(function(){
  getComname();
});

function showUpdate(x) {
    var tbl = document.getElementById("flowerTable");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 1; j < tbl.rows[i].cells.length; j++)
                tbl.rows[i].cells[j].onclick = function () {
                    getUpdate($(this).siblings()[0].innerText);
                };
        }
    }
}

function showDetails(x) {
    var tbl = document.getElementById("flowerTable");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 1; j < tbl.rows[i].cells.length; j++)
                tbl.rows[i].cells[j].onclick = function () {
                    getSightings($(this).siblings()[0].innerText);
                };
        }
    }
}


function clearDetails(x) {
    $("#sightingsTable tr").remove();    
}

function getComname(){
    $.get('/flowers-all', function(data){
      renderComnameData(data);
    });
}

function getSightings(id){
    $('#floId').empty();        
    $('#floId').append(id);    
    $.get('/sightings-slp/'+id, function(data){
      renderSightingsData(data);
    });
}

function getAll(id){
    $.get('/sightings/'+id, function(data){
        renderSightingsData(data);
      });    
}

function renderComnameData(data){
    for (var i = 0; i < data.length; i++) {
      $('#flowerTable').append('<tr>\
      <td>'+ data[i].COMNAME + '\
      <td><button class=\
      "btn btn-info" style="float: right;" onclick="showDetails(this)">\
      Details</td>\
      <td><button class=\
      "btn btn-info" style="float: right;" onclick="showUpdate(this)">\
      Update</td>\
      </tr>');  
    }    
} 

function renderSightingsData(data){
    $("#sightingsTable tr").remove();
    $('#sightingsTable').append('<tr>\
    <th>No</th>\
    <th>Sighted</th>\
    <th>Location</th>\
    <th>Person</th>\
    </tr>');

    for (var i = 0; i < data.length; i++) {
        $('#sightingsTable').append('<tr>\
        <td>' + (i+1) + '</td>\
        <td>' + data[i].SIGHTED + '</td>\
        <td>' + data[i].LOCATION + '</td>\
        <td>' + data[i].PERSON + '</td>\
        </tr>');
    }    
} 