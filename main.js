$(document).ready(function() {

    var formInput = {
        artist: [],
        city: '',
        state: '',
    }

    $('#submit').on('click', function() {
          //variables
          formInput.artist = $('#artistURL').val()
          formInput.city = $('#cityURL').val()
          formInput.state = $('#select').val()
          $(console.log(formInput.city))
          $(console.log(formInput.state))
          $(console.log(formInput.artist))
          $.ajax({
              url: 'http://api.bandsintown.com/artists/'+formInput.artist+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+formInput.city+','+formInput.state+'&radius=50',
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
