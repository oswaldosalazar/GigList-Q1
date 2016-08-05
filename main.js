var dataLength = 0
var formInput = {}
var recommendedList = []
var recArtist = []
var uniqueArtists = []

function gigList (city, state, artists) {

    for (var j in artists) {
        $.ajax({
            url: 'http://api.bandsintown.com/artists/'+artists[j]+'/events/search.json?api_version=2.0&app_id=GIGLIST&location='+city+','+state+'&radius=50',
            dataType: 'jsonp',
            error: function(err) {console.error(err)},
            method: 'GET',
            success: function(data) {
                //set length variable to prevent "else" if one data point is empty
                dataLength += data.length
                // console.log("datalength   " + dataLength)
                //routine to fill table if favorite artist is touring in the city
                if (dataLength > 0) {
                    $("#successFailureMsg").attr("class","text-success").text("Great! Your favorite artists or recommended ones are touring in your area!")
                    $("#tableHeader").html("<tr><th>Artist</th><th>Venue</th><th>City</th><th>State</th><th>Date and Time</th><th>Tickets</th></tr>")
                    for (var i in data) {
                        $(".table").append("<tr><td>"+data[i].artists[0].name+"</td><td>"+data[i].venue.name+"</td><td>"+data[i].venue.city+"</td><td>"+data[i].venue.region+"</td><td>"+data[i].formatted_datetime+"</td><td> <a href="+data[i].ticket_url+" target="+"_blank"+">Ticket Link</a> </td></tr>")
                    }
                }
            },
        })
    }
    dataLength = 0

}


function recommend (city, state, artists) {

    console.log("Recommend for "+artists)

    for (var j in artists) {
        $.ajax({
            url: 'http://api.bandsintown.com/artists/'+(artists[j])+'/events/recommended?location='+city+','+state+'&radius=50&app_id=YOUR_APP_ID&api_version=2.0&format=json',
            dataType: 'jsonp',
            error: function(err) {console.error(err)},
            method: 'GET',
            success: function(dataRecom) {
                console.log(dataRecom)
                if (dataRecom.length > 0) {
                    for (var i in dataRecom) {
                        recommendedList.push(dataRecom[i].artists[0].name)
                    }
                }
            },
        })
    }
    console.log("Full unfiltered list: "+recommendedList)
    // return recommendedList
}

function doNotRepeatArtists (recommendedList) {

        uniqueArtists = recommendedList.filter(function(elem, pos) {
            return recommendedList.indexOf(elem) == pos;
        })
        console.log(recommendedList.length)

        recommendedList = []
        console.log("Complete list no repeat: " + uniqueArtists)
        // return uniqueArtists
}

$(document).ready(function() {

    $('#submit').on('click', function(event) {
        //Default action prevented
        event.preventDefault()
        // $("#successFailureMsg").empty()
        $("#tableHeader tr").empty()
        //Assign variables from form inputs.
        formInput.city = $('#cityURL').val()
        formInput.state = $('#select').val()
        formInput.artists = $('#artistURL').val().split(',')
        //Trim spaces from entered artists names
        formInput.artists = formInput.artists.map(Function.prototype.call, String.prototype.trim)
        console.log(formInput.artists)
        //Remove data form previous clicks
        $("#eventsTable tr").remove()
        //Call function to populate table with input and recommended artists

        // gigList(formInput.city, formInput.state, formInput.artists)
        recommend(formInput.city, formInput.state, formInput.artists)
        setTimeout( function() {

            doNotRepeatArtists(recommendedList)
            if (recommendedList.length === 0) {
                $("#successFailureMsg").empty()
                $("#tableHeader tr").empty()
                $("#successFailureMsg").attr("class","text-danger").text("Bummer! Please wait for your favorite artists or recommended ones to tour in your area.")
            }
            gigList(formInput.city, formInput.state, uniqueArtists)



        },1000)
        recommendedList = []




        // doNotRepeatArtists(recommendedList)


        // recommend(formInput.city, formInput.state, formInput.artists)


        // gigList(formInput.city, formInput.state, recArtist)

        // $.when(recommend(formInput.city, formInput.state, formInput.artists)).then(gigList(formInput.city, formInput.state, uniqueArtists))


        // console.log("Recommended array: "+recArtist)

        //Call function to recommend artists
    })
})
