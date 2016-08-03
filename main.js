var allEvents = []
var artistEvents = []
var dataLength = 0
var formInput = {}
var artists =''

function gigList (city, state, artists) {
    for ( var j in artists) {
        $.ajax({
            url: 'http://api.bandsintown.com/artists/'+artists[j]+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+city+','+state+'&radius=50',
            dataType: 'jsonp',
            error: function(err) {console.error(err)},
            method: 'GET',
            success: function(data) {
                dataLength += data.length
                if (dataLength > 0) {
                    $("#successFailureMsg").attr("class","text-success").text("Great! Your favorite artists are on tour in your area!")
                    $("#tableHeader").html("<tr><th>Artist</th><th>Venue</th><th>City</th><th>State</th><th>Date and Time</th><th>Tickets</th></tr>")
                    for (var i in data) {
                        $(".table").append("<tr><td>"+data[i].artists[0].name+"</td><td>"+data[i].venue.name+"</td><td>"+data[i].venue.city+"</td><td>"+data[i].venue.region+"</td><td>"+data[i].formatted_datetime+"</td><td> <a href="+data[i].ticket_url+" target="+"_blank"+">Ticket Link</a> </td></tr>")
                        // allEvents.push(artistEvents[i])
                    }
                    console.log(dataLength)
                    console.log(artists)
                } else {
                    console.log("RECOMMEND COMMENT")
                    $("#successFailureMsg").empty()
                    $("#tableHeader tr").empty()
                }
            },
        })
    }
    dataLength = 0
}

function recommended(artists) {
    console.log("Recommend for "+artists)
}




$(document).ready(function() {

    $('#submit').on('click', function(event) {
        //Default action prevented
        event.preventDefault()
        //Assign variables from form inputs.
        formInput.city = $('#cityURL').val()
        formInput.state = $('#select').val()
        formInput.artists = $('#artistURL').val().split(',')
        //Trim spaces from entered artists names
        formInput.artists = formInput.artists.map(Function.prototype.call, String.prototype.trim)
        //Remove data form previous clicks
        $("#eventsTable tr").remove()
        //Call function to populate table with input artists
        gigList(formInput.city, formInput.state, formInput.artists)
        //Call function to recommend artists
        recommended(formInput.artists)
    })
})

                        // artistEvents[i] = {
                        //     tabArtist: data[i].artists[0].name,
                        //     tabVenue: data[i].venue.name,
                        //     tabCity: data[i].venue.city,
                        //     tabState: data[i].venue.region,
                        //     tabDate: data[i].formatted_datetime,
                        //     tabTix: data[i].ticket_url,
                        // }
