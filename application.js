var geocoder, map, mapCanvas;

// create a map and display it
function initialize() {
  mapCanvas = document.getElementById('map-canvas');
  geoCoder = new google.maps.Geocoder();              // create geocoder
  var latlng = new google.maps.LatLng(37.7749, -122.4194);     // set default lat/long for sf
  var mapOptions = {
    zoom: 15,
    center: latlng
  }
  map = new google.maps.Map(mapCanvas, mapOptions); // create new map in the map-canvas div
} //close initialize function

// geocode an address and show pointer on the map
function changeAddress(address) {
  geoCoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);      // center the map on address
      var marker = new google.maps.Marker({         // place a marker on the map at the address
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.log('Unsuccessfull ' + status);
    }
  });
} //close changeAddress function

google.maps.event.addDomListener(window, 'load', initialize);   // setup initial map

$(document).ready(function() {
  console.log(initialize)

  // get map button functionality
  $(".submit-address").click(function(event){
    event.preventDefault();
    var address = $(".input-address").val();         // grab the address from the input field
    changeAddress(address);                   // geocode the address
  });



  // render customers and order data
  // $.ajax({
  //   url: "data.json",
  //   dataType: "json"
  // }).done(function(response){
  //   // console.log(response.customer);
  //   $('#name').text(response.customer.name);
  //   $('#price').text("$"+ response.order.price)
  // })


  // mobile navigation
  $('.mobile-nav').on('click', function(){
    var i = $(this).find('.fa')[0];
    var ul = $(document).find('.nav');
    console.log(ul)
    if (i.className == "fa fa-bars") {
      i.className = "fa fa-times";
      ul.addClass('full-nav');
    } else {
      i.className = "fa fa-bars";
      ul.removeClass('full-nav');
    }

  });

}); // close document.ready