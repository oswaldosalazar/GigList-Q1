$(document).ready(function() {
  // console.log('sanity check');

  //globals

  //getting IP and adding to the page
    var getIP = $.ajax({
      url: 'http://jsonip.com',
      method: "GET",
      success: function(data) {
        console.log(data);
        IP = data.ip;

        $('#tuning').html('Your IP Address:  ' + IP);
      }
    });

    //getting city, long, lat, and colloquial description
    var getDescription = $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=denver,co&APPID=23eda5ada275f21ef9e1431db006b7df',
      method: "GET",
      success: function(data) {
        console.log(data);
      // adding city to the page
      $('#currentLoc').html('Your Current location: ' + data.name);
      //loading longitude and latitude, easily accessed since object
        var point = new GeoPoint(data.coord.lon, data.coord.lat)

        latitude = point.getLatDeg()
        longitude = point.getLonDeg()


        $('#lat').html('(Latitude: ' + latitude + ', ');
        $('#long').html('Longitude: ' + longitude + ')');

        //colloquial description
        var weatherData = data.weather;
        $('#colloquial').html(weatherData[0].description);
      }
    });



// ==========================================
    //on click function
    $('#submit').on('click', function() {
      //variables
      var userInput = $('#userInput').val();
      var cityState = userInput.toLowerCase().split(' ').join('');

      //make disappear id hide
    //   $('#disappear').hide();
      //request using entered data
      $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+cityState+'&APPID=23eda5ada275f21ef9e1431db006b7df',
      method: "GET",
      success: function(data) {
// adding city to the page
      $('#searchLoc').html('Search Results: ' + data.name)
      //loading longitude and latitude, easily accessed since object
        var point = new GeoPoint(data.coord.lon, data.coord.lat)
        searchLatitude = point.getLatDeg();
        searchLongitude = point.getLonDeg();
        $('#searchLat').html('(Latitude: ' + searchLatitude + ', ');
        $('#searchLong').html('Longitude: ' + searchLongitude + ')');
        //colloquial description
        var weatherData = data.weather;
        $('#searchColloquial').html(weatherData[0].description).css('background-color', '#B8D5B8');
    }
   });
  });
});
