$(document).ready(function(){
  getComname();
});

function getComname(){
  $.get('/flowers-all', function(data){
    renderComnameData(data);
  });
}

function renderComnameData(data){
  for (var i = 0; i < data.length; i++) {
    $('#flowerTable').append('<tr>\
    <td id=flower' + i + '>'+ data[i].COMNAME + '<button class=\
    "btn btn-info" style="float: right;" onclick="showDetails(this)">\
    Details\</td>\
    <td id=flower' + i + '>'+ data[i].COMNAME + '<button class=\
    "btn btn-info" style="float: right;" onclick="edit(this)">\
    Edit\</td>\
    </tr>'); 
  }    
} 

function showDetails(x) {
    var tbl = document.getElementById("flowerTable");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++)
                tbl.rows[i].cells[j].onclick = function () { 
                    getSightings(this.innerText.substr(0, this.innerText.length-7));
                };
        }
    }
}

function edit(x) {
    var tbl = document.getElementById("flowerTable");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++)
                tbl.rows[i].cells[j].onclick = function () { 
                    getEdit(this.innerText.substr(0, this.innerText.length-7));
                };
        }
    }
}

function getEdit(x){
    $.get('/flowers/' + x, function(data){
    renderflowersData(data);
    console.log(data);
    })
}

function renderflowersData(data){
    $('#updateTable').append('<tr>\
    <th>Genus</th>\
    <th>Species</th>\
    <th>Comname</th>\
    </tr>');
    for (var i = 0; i < data.length; i++) {
        $('#updateTable').append('<tr>\
        <td>' + data[i].GENUS + '</td>\
        <td>' + data[i].SPECIES + '</td>\
        <td>' + data[i].COMNAME + '</td>\
        </tr>');
    }  
        
}

function clearDetails(x) {
    $("#sightingsTable tr").remove();    
}

function getSightings(id){
    $.get('/flowers/'+id, function(data){
      renderSightingsData(data);
    });
}

function renderSightingsData(data){
    $("#sightingsTable tr").remove();
    $('#sightingsTable').append('<tr>\
    <th>Sighted</th>\
    <th>Location</th>\
    <th>Person</th>\
    </tr>');

    for (var i = 0; i < data.length; i++) {
        $('#sightingsTable').append('<tr>\
        <td>' + data[i].SIGHTED + '</td>\
        <td>' + data[i].LOCATION + '</td>\
        <td>' + data[i].PERSON + '</td>\
        </tr>');
    }    
  } 