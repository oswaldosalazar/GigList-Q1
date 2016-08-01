$(document).ready(function() {

    var formInput = {
        city: '',
        state: '',
        artists: [''],
    }
    var allEvents = []

    $('#submit').on('click', function(event) {
        //variables
        event.preventDefault()
        formInput.city = $('#cityURL').val()
        formInput.state = $('#select').val()
        formInput.artists = $('#artistURL').val().split(',')
        $(console.log(formInput.city))
        $(console.log(formInput.state))
        formInput.artists = formInput.artists.map(Function.prototype.call, String.prototype.trim)
        $(console.log(formInput.artists))

        $.ajax({
            url: 'http://api.bandsintown.com/artists/'+(formInput.artists[0])+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+formInput.city+','+formInput.state+'&radius=50',
            dataType: 'jsonp',
            error: function(err) {console.error(err)},
            method: 'GET',
            success: function(data) {
                console.log(data.length)
                // console.log(data[0].title)
                console.log(data)
                console.log(data[0].artists[0].name)
                console.log(data[0].venue.name)
                console.log(data[0].venue.city)
                console.log(data[0].venue.region)
                $('#eventTitle').text(data[0].title)
                $('#eventDateTime').text(data[0].formatted_datetime)
                $('a').attr("href", data[0].ticket_url)
                for (var i in data) {
                    allEvents[i] = {
                        tabArtist: data[i].artists[0].name,
                        tabVenue: data[i].venue.name,
                        tabCity: data[i].venue.city,
                        tabState: data[i].venue.region,
                        tabDate: data[i].formatted_datetime,
                        tabTix: data[i].ticket_url,
                    }
                }
                console.log(allEvents)
            },
        })
    })


})


// url: 'http://api.bandsintown.com/artists/The Decemberists/events.json?api_version=2.0&app_id=GALVANIZE',
 // 'http://api.bandsintown.com/artists/'+formInput.artist+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+formInput.city+','+formInput.state+'&radius=50'
