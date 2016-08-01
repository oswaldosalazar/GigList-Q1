$(document).ready(function() {

    var formInput = {}
    var allEvents = []
    var artistEvents = []

    $('#submit').on('click', function(event) {
        //variables
        event.preventDefault()
        $("#eventsTable tr").remove()
        formInput.city = $('#cityURL').val()
        formInput.state = $('#select').val()
        formInput.artists = $('#artistURL').val().split(',')
        $(console.log(formInput.city))
        $(console.log(formInput.state))
        formInput.artists = formInput.artists.map(Function.prototype.call, String.prototype.trim)
        $(console.log(formInput.artists))
        for (var j in formInput.artists) {
            $.ajax({
                url: 'http://api.bandsintown.com/artists/'+(formInput.artists[j])+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+formInput.city+','+formInput.state+'&radius=50',
                dataType: 'jsonp',
                error: function(err) {console.error(err)},
                method: 'GET',
                success: function(data) {
                    for (var i in data) {
                        artistEvents[i] = {
                            tabArtist: data[i].artists[0].name,
                            tabVenue: data[i].venue.name,
                            tabCity: data[i].venue.city,
                            tabState: data[i].venue.region,
                            tabDate: data[i].formatted_datetime,
                            tabTix: data[i].ticket_url,
                        }
                        $(".table").append("<tr><td>"+data[i].artists[0].name+"</td><td>"+data[i].venue.name+"</td><td>"+data[i].venue.city+"</td><td>"+data[i].venue.region+"</td>                        <td>"+data[i].formatted_datetime+"</td><td> <a href="+data[i].ticket_url+" target="+"_blank"+">Ticket Link</a> </td></tr>")
                        allEvents.push(artistEvents[i])
                    }
                    console.log(artistEvents)
                    console.log(allEvents)
                },
            })
        }
        allEvents = []
        artistEvents = []
    })

})


// http://api.bandsintown.com/artists/The Decemberists/events.json?api_version=2.0&app_id=GALVANIZE
