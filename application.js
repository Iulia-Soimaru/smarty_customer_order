$(document).ready(function(){
  // create a map and display it
  function initialize() {
    geoCoder = new google.maps.Geocoder();              // create geocoder
    var latlng = new google.maps.LatLng(37.7749, -122.4194);     // set default lat/long for sf
    var mapOptions = {
      zoom: 15,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); // create new map in the map-canvas div
  } //close initialize function


  google.maps.event.addDomListener(window, 'load', initialize);   // setup initial map
});

