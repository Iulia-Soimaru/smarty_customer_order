var geocoder, map, mapCanvas;

// create a map and display it
function initialize() {
  mapCanvas = document.getElementById('map-canvas');
  geoCoder = new google.maps.Geocoder();              // create geocoder
  var latlng = new google.maps.LatLng(37.7846, -122.3974);     // set default lat/long for sf
  var mapOptions = {
    zoom: 15,
    center: latlng
  }
  map = new google.maps.Map(mapCanvas, mapOptions); // create new map in the map-canvas div
  var marker = new google.maps.Marker({
        map: map,
        position: latlng
      });
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

  // get map button functionality
  $(".submit-address").click(function(event){
    event.preventDefault();
    var address = $(".input-address").val();         // grab the address from the input field
    changeAddress(address);                   // geocode the address

    //update data in customer's address
    $.ajax({
      url: "data.json",
      dataType: "json"
    }).done(function(response){
      var newAddress = $('.input-address').val()
      $('.customer-address').text(newAddress);
      $(".input-address").val('')
    }).fail(function(response){
      console.log(response)
    })

  });



  //render customers and order data
  $.ajax({
    url: "data.json",
    dataType: "json",
  }).done(function(response){
    // console.log(response.customer);
    $('.customer-name').text(response.customer.name);
    $('.customer-address').text(response.customer.address);
    $('.service-name').text(response.service.name);
    $('.service-day').text(response.service.day);
    $('.service-time').text(response.service.time);
    $('.service-fee').text("Fee: $" + response.service.fee);
    $('.total-price span').text(response.service.price + response.service.fee)
  }).fail(function(response){
    alert(response);
  })


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


  //drag and drop
  var dropZone = document.querySelector('.total-price')
  var dragElements = $('.service-addition');
  var elementDragged = null;
  var price = 0;

  dragElements.on('dragstart', function(e){
    elementDragged = this;
    price = $(this).find('span').text();
  });



  dropZone.addEventListener('dragover', function(e){
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";

    return false;
  });


  dropZone.addEventListener('drop', function(e){
    e.preventDefault();

    var currentPrice = $(this).find('span').text()
    var newPrice = parseFloat(currentPrice) + parseInt(price)

    $(this).find('span').text(newPrice)

    return false;
  });


}); // close document.ready