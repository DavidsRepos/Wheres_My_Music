if (city === "" || city != null) {
    $("#mapid").hide();
    $("#Band-Name").focus();

} 
    else {


  //adding the map function through Leaflet Issues#13
  function addMap() {
    $("#mapid").empty();
    var mymap = L.map('mapid').setView([venueLat, venueLong], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWFybTQ3MDIiLCJhIjoiY2pyM3RiNmw5MGU1bDN5bXk5MXE1ZGs2bSJ9.QbhjZk1rjfQb2fo7bvI-8A'
        }).addTo(mymap);         

    //getting the marker in map using the venue Name
    var marker = L.marker([venueLat, venueLong]).addTo(mymap);
    marker.bindPopup("<b>Venue</b><br>" + venueName).openPopup();

    };

    $("#mapid").append(addMap);

    // this always brings the cursor back to artist text field after submit
    $("#Band-Name").focus();

} // end of if statement for city search

$("#mapid").show();