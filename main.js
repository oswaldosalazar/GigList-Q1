$(document).ready(function() {

    var formInput = {}
    var allEvents = []
    var artistEvents = []
    var dataLength = 0

    $('#submit').on('click', function(event) {

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
                    dataLength += data.length
                    console.log(dataLength)
                    if (dataLength > 0) {
                        $("#successFailureMsg").attr("class","text-success").text("Great! Your favorite artists are on tour in your area!")
                        for (var i in data) {
                            // artistEvents[i] = {
                            //     tabArtist: data[i].artists[0].name,
                            //     tabVenue: data[i].venue.name,
                            //     tabCity: data[i].venue.city,
                            //     tabState: data[i].venue.region,
                            //     tabDate: data[i].formatted_datetime,
                            //     tabTix: data[i].ticket_url,
                            // }
                            $(".table").append("<tr><td>"+data[i].artists[0].name+"</td><td>"+data[i].venue.name+"</td><td>"+data[i].venue.city+"</td><td>"+data[i].venue.region+"</td>                        <td>"+data[i].formatted_datetime+"</td><td> <a href="+data[i].ticket_url+" target="+"_blank"+">Ticket Link</a> </td></tr>")
                            allEvents.push(artistEvents[i])
                        }
                    }
                },
            })
        }
        $.ajax({
            url: 'http://api.bandsintown.com/artists/'+(formInput.artists[j])+'/events/recommended?location='+formInput.city+','+formInput.state+'&radius=50&app_id=YOUR_APP_ID&api_version=2.0&format=json',
            dataType: 'jsonp',
            error: function(err) {console.error(err)},
            method: 'GET',
            success: function(dataRecom) {
                console.log(dataLength)
                if (dataLength === 0) {
                    if(dataRecom.length === 0) {
                        $("#successFailureMsg").attr("class","text-danger").text("Sorry, none of your artists are coming and there are no recommendations at this time. Check out in a few days!")
                    } else {
                        $("#successFailureMsg").attr("class","text-warning").text("Bummer! Your favorite artists are not coming but check out these recommendations!")
                        for (var i in dataRecom) {
                            // artistEvents[i] = {
                            //     tabArtist: data[i].artists[0].name,
                            //     tabVenue: data[i].venue.name,
                            //     tabCity: data[i].venue.city,
                            //     tabState: data[i].venue.region,
                            //     tabDate: data[i].formatted_datetime,
                            //     tabTix: data[i].ticket_url,
                            // }
                            $(".table").append("<tr><td>"+dataRecom[i].artists[0].name+"</td><td>"+dataRecom[i].venue.name+"</td><td>"+dataRecom[i].venue.city+"</td><td>"+dataRecom[i].venue.region+"</td>                        <td>"+dataRecom[i].formatted_datetime+"</td><td> <a href="+dataRecom[i].ticket_url+" target="+"_blank"+">Ticket Link</a> </td></tr>")
                            allEvents.push(artistEvents[i])
                        }
                    }
                }
                dataLength = 0
            },
        })
    })
})
