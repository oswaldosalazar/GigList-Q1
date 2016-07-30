$(document).ready(function() {

    var formInput = {
        city: '',
        state: '',
        artists: [],
    }

    $('#submit').on('click', function() {
          //variables
          formInput.city = $('#cityURL').val()
          formInput.state = $('#select').val()
          formInput.artists = $('#artistURL').val().split(',')
          $(console.log(formInput.city))
          $(console.log(formInput.state))
          $(console.log(formInput.artists))
          $(console.log(formInput.artists[1]))
          $.ajax({
              url: 'http://api.bandsintown.com/artists/'+(formInput.artists[1].trim())+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+formInput.city+','+formInput.state+'&radius=50',
              dataType: 'jsonp',
              error: function(err) {console.error(err)},
              method: 'GET',
              success: function(data) {
                  console.log(data)
              },
          })
    })

})


// url: 'http://api.bandsintown.com/artists/The Decemberists/events.json?api_version=2.0&app_id=GALVANIZE',
 // 'http://api.bandsintown.com/artists/'+formInput.artist+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+formInput.city+','+formInput.state+'&radius=50'
