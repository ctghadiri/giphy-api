// create form that takes in input with button
// create on click function that takes in the val of input
    // adds to array for buttons
    // turns the array into buttons
// create ajax link to giphy
    // get url 
    // rating info
    // limit
    // q
// new buttons create 10 gifs of designated input
    // append rating under gifs
    // images should animate when clicked and stop as well
// have a few buttons already made

// ------------------------


// Initial Cartoons
var gifs = ["Rick and Morty", "Dexter's Laboratory", "Johnny Bravo", "Adventure Time", "Regular Show"];



// -----------------Buttons-----------------//

// function for displaying gifs
function renderButtons(){

    // clear out the old buttons to add the new array
    $("#gif-buttons").empty()

    // loop through the gif array
    for(var i = 0; i < gifs.length; i++){

        // create var to hold code for new button we'll create
        var newButton = $("<button>");

        // add class and data attribute with value of gifs at index i to buttons
        newButton.addClass("gifs").attr("data-name", gifs[i]);

        // add text to the buttons with the designated value of i
        newButton.text(gifs[i]);

        // add button to html
        $("#gif-buttons").append(newButton);
    }  
}

// function handling event of hitting submit
$("#add-gif").on("click", function(event) {

    // prevents the form from submitting itself
    event.preventDefault();

    // add variable to grab the text
    var gif = $("#gif-input").val().trim();

    // add new input information into gifs array
    gifs.push(gif);

    // call renderButtons function to add the new list
    renderButtons();
});

// call renderButtons function too add the initial list
renderButtons();


// -----------------Gif Creation-----------------//


$(document).on("click",".gifs", function(){

    $("#gif-images").empty();

    // add variable to add attribute to button being clicked
    var cartoon = $(this).attr("data-name");

    // add variable of url being used to connect to giphy API
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&rating=pg" + "&api_key=WQglZzaDseLC1rFedrnkIA9dsPLoLx0W&limit=10"
    console.log(queryURL);
    // ajax call to retrieve items from the giphy API
    $.ajax({
        url: queryURL,
        type:"GET",

    // add .then to wait for ajax to gather data
    }).then(function (response) {

        // add variable to store data from ajax pull
        var results = response.data;

        // loop through results pulled from giphy
        for(var i = 0; i < results.length; i++) {
            console.log(results[i]);
            console.log(results[i].images.original_still.url);
            // add variable to create div
            var cartoonDiv = $("<div>");

            // add variable to create p tag with rating information 
            var p = $("<p>").text("Rating: "+ results[i].rating);

            // add variable to create img with class
            var cartoonImage = $("<img>").addClass("gif-state");

            // add attribute to image for source with url at index i
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            
            // add attribute to image for animated url
            cartoonImage.attr("data-animate", results[i].images.fixed_height.url);

            // add attribute to image for the data state to assist in switching between animated and still
            cartoonImage.attr("data-state", "still");
            
            // add attribute to image for image url
            cartoonImage.attr("data-still", results[i].images.fixed_height_still.url);


            // attach the paragraph with rating infor to the empty div
            cartoonDiv.append(p);

            // attach the gif to the Div with the paragraph tag
            cartoonDiv.append(cartoonImage);

            // attach the div with the paragraph and gif to html
            $("#gif-images").prepend(cartoonDiv);
        }
    })
})

// -----------------GIF Manipulation-----------------//

$(document).on("click", ".gif-state",function () {

    var state = $(this).attr("data-state");

    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    else if(state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

})
