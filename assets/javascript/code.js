var venueLong = "";
var venueLat = "";


$(document).ready(function () {



var config = {
    apiKey: "AIzaSyC4zxltnljcbEqmFNnDLxwsKOZZwPCFr4o",
    authDomain: "wheresmymusic-41cff.firebaseapp.com",
    databaseURL: "https://wheresmymusic-41cff.firebaseio.com",
    projectId: "wheresmymusic-41cff",
    storageBucket: "",
    messagingSenderId: "270794472389"
  };
  
  firebase.initializeApp(config);
 
  var database = firebase.database();

//Submit Search logic

bandName = "";
city = "";


$("#submit-Search").on("click",function(event){
    event.preventDefault();

    $("#venue-info").empty();
    $("#mapid").empty();

    bandName = $("#Band-Name").val().trim();
    city = $("#CityName").val().trim();
    
    // var dates=$("#Dates").val().trim();
    // var price = $("#PricePay").val().trim();



    // #Band-Name input text field validation...
   var isValid = true;
    $("#Band-Name").each(function() {
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).next('.error').remove();
            $(this).after('<div class="error">An Artist or Band name is required...</div>');
            $(this).css({
                "border": "3px solid red",
                "background": "#FFCECE"
            });
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });
            $(this).next('.error').remove(); 
        }
    });
    if (isValid == false)
       e.preventDefault();  
        // end of input text validation... 


    ticketInfo();

    //Function call to Ticketmaster API
    function ticketInfo() {
 
    //Set Variables
    var TMAPIKEY = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";
    var radius = "500";
    var unit = "miles";
    var classification = "music";
    // var latlong = "40.712776,-74.005974";

    // if/else statement to present different results if city is or isn't specified
    if (city !== "") {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + TMAPIKEY + "&keyword=" + bandName + "&radius=" + radius + "&unit=" + unit + "&city=" + city + "&classificationName=" + classification;
        console.log(queryURL);
        }
        else {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + TMAPIKEY + "&keyword=" + bandName + "&classificationName=" + classification;
        console.log(queryURL);
        };

$.ajax({
   
    url: queryURL,
    method: "GET"

    //Process API Get response
    }).then(function(response){
        console.log(response);
        //Loop through for 10 event results print to screen
        for (i = 0; i < 10; i++) {
            
        var eventName = response._embedded.events[i].name;
        var eventURL = response._embedded.events[i].url;
        var localeventDate = response._embedded.events[i].dates.start.localDate;
        var localeventDateUnformatted = response._embedded.events[i].dates.start.localDate;
        var localeventDate = moment(localeventDateUnformatted).format("MMMM Do YYYY")
        var localeventTime = response._embedded.events[i].dates.start.localTime;
        var promoter = response._embedded.events[i].promoter.name;
        var eventImage = response._embedded.events[i].images[0].url;
        var venueCity = response._embedded.events[i]._embedded.venues[0].city.name;
        var venueCountry = response._embedded.events[i]._embedded.venues[0].country.name;
        venueLong = response._embedded.events[i]._embedded.venues[0].location.longitude;
        venueLat = response._embedded.events[i]._embedded.venues[0].location.latitude;
        var venueName  = response._embedded.events[i]._embedded.venues[0].name; //venue name
        var artistName  = response._embedded.events[i]._embedded.attractions[0].name; //artist name       

         // Creating a div for the info                  
         var venueDiv = $("<div>", {class: 'holder'});

         var a = $('<p>').text(promoter).css("color", "white");
         var b = $('<p>').text(eventName).css("color", "white");
         var c = $('<p>').text(localeventDate + ", " + localeventTime).css("color", "white");
         var d = $('<p>').text(venueName).css("color", "white");
         var e = $('<p>').text(venueCity + ", " + venueCountry).css("color", "white");
 
         //  Creating a new variable to include data for eventImage
         var image = $("<img>").attr("src", eventImage).css("width", "50%").css("height", "auto").css("float","left");
         image.addClass("imageclick");
   
    
         
         // create a div and button for a favorite button
         var favBtn = $("<p class='far fa-heart fa-lg' id='heart'></p>").css("padding","3px");
         favBtn.attr('favorite-status', 'No').css("color", "red").css("float","right");
         favBtn.attr("data-promoter", promoter);
         favBtn.attr("data-dateTime", localeventDate + ", " + localeventTime)
         favBtn.attr("data-venue" , venueCity + ", " + venueCountry);
         favBtn.attr("data-eventName",eventName);
         favBtn.attr("data-eventImage", eventImage);
         favBtn.attr("data-eventURL" , eventURL);
         favBtn.attr("data-LatLong" , venueLat + "," + venueLong);
         favBtn.attr("title","Save Venue");
         // create a div and button for a map section
         var googleMap = "https://www.google.com/maps/@" + venueLat + "," + venueLong + ",15z";
         var mapBtn = $("<a>", {class:"fas fa-map-marked-alt fa-lg"}).attr("href", googleMap).attr("target","_blank").attr("title","Map").css("float","right").css("color","yellow").css("padding","3px");
         mapBtn.attr({'favorite-status': 'No'});
         mapBtn.addClass("rendermap");
        //  console.log(googleMap);

         // create a div and button for a ticket purchase page
         var ticketBtn = $("<a>", {class: "tix"}).attr("href", eventURL).attr("target","_blank").attr("title","Buy Tickets Now!").css("float","right").css("width", "20%").css("height", "auto");
         var ticketBtnImage = $("<img>").attr("src","assets/images/tix.png");
        // var clickImage = $("<p><i class='fas fa-mouse-pointer fa-lg'></i>");
         ticketBtn.append(ticketBtnImage);

         //  append everything within the venue card to the html...
         venueDiv.append(image,mapBtn,favBtn,a,b,c,d,e,ticketBtn); 
         $("#venue-info").append(venueDiv);  
         $("#venue-info").slideDown("1000");

         // Requirement for text in Band field #43
         var normalizeBand = bandName.toUpperCase();
         var eventBand = artistName.toUpperCase();



        };  // end of for loop

    });  //  end of .then response

};  //end of ajax call

$("form")[0].reset();

});  // end of submit search

$(document.body).on("click", "#heart", function () {
          
    var favStatus = $(this).attr("favorite-status");
    var parentCard = $(this).attr("data-promoter");

    

    
    // Add to Favorites section
    if (favStatus === "No") {
        $(this).addClass("fas").removeClass("far");
        $(this).attr({
            'favorite-status': 'Yes'});
       
            var favSav = {
                promoter : $(this).attr("data-promoter"),   
                eventName: $(this).attr("data-eventName"),
                eventURL: $(this).attr("data-eventURL"),
                eventImage: $(this).attr("data-eventImage"),
               localeventDate : $(this).attr("data-dateTime"),
               VenueLatLong : $(this).attr("data-LatLong"),
               venueCity : $(this).attr("data-venue"),
               favoriteStatus : $(this).attr('favorite-status'),
          
            }
            
               database.ref().push(favSav);
       
     } else {
            // Remove from Favorites
            $(this).attr({
                'favorite-status': 'No'
            }).addClass("far").removeClass("fas");
        
        }
    }); 

    database.ref().on("child_added", function(snapshot){
       
        // console.log(snapshot.val());
        
            $("#favorite").attr(snapshot.val());
    
            $("#favorite").on("click" , function (event) {
                event.preventDefault();
                
                console.log(this);
                          
                      
                var venueDiv = $("<div>", {class: 'holder'});
            
                var a = $('<p>').text(snapshot.val().eventName);
                       
                var b = $('<p>').text(snapshot.val().promoter);
            
                var c = $('<p>').text(snapshot.val().localeventDate);
            
                var d = $('<p>').text(snapshot.val().venueCity); 
            
                var eventImage = $('<img>');
                    eventImage.addClass("favImg");
        
                 eventImage.attr("src", snapshot.val().eventImage);


                 var googleMap = "https://www.google.com/maps/@" + snapshot.val().venueLat + "," + snapshot.val().venueLong + ",15z";
                 var mapBtn = $("<a>", {class:"fas fa-map-marked-alt fa-lg"}).attr("href", googleMap).attr("target","_blank").css("float","right").css("color","yellow").css("padding","3px");
                 mapBtn.attr({'favorite-status': 'No'});
                //  console.log(googleMap);
        
                 // create a div and button for a ticket purchase page
                 var ticketBtn = $("<a>", {class: "tix"}).attr("href", snapshot.val().eventURL).attr("target","_blank").attr("title","Buy Tickets Now!").css("float","right").css("width", "20%").css("height", "auto");
                 var ticketBtnImage = $("<img>").attr("src","assets/images/tix.png");
                 
                 ticketBtn.append(ticketBtnImage);



                 var deleteFav = $("<p class='fas fa-heart fa-lg' id='delete'></p>");
                                   
                 deleteFav.attr("data-snapKey",snapshot.key).attr("title","Delete Saved Search");


                 venueDiv.append(eventImage);
                    //venueDiv.append(b,a,c,d);
                    
            
                   // venueDiv.append(eventImage);
                   venueDiv.append(mapBtn,deleteFav,a,b,c,d,ticketBtn); 
                   

                   // venueDiv.append(deleteFav);
                    
                        //  prepend all favorite data to html in the form of a button
                     $("#venue-fav").prepend(venueDiv);

                     $("#mapid").hide();
                   
                     $(document.body).on("click", "#delete" ,function(){
                      
                        $(this).addClass("far").removeClass("fas")
                     
                     
                      database.ref($(this).attr("data-snapKey")).remove();


                      $(this).attr("class", ".holder").hide();
                    // $(this).attr(snapshot.val()).hide();
                    });
                   
                   
                    });
    
            });


             //  on click function for ticket button
        $(document.body).on("click", ".tix", function () {
        });

    // When the user scrolls down 600px from the top of the document, show "back to top" button
    var btn = $('#upBtn');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 600) {
         btn.addClass('show');
        } else {
         btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
     e.preventDefault();
     $('html, body').animate({
        scrollTop: 0
     }, '300');

    }); //  end of up button function

});  //  end of document ready function
