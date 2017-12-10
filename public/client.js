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