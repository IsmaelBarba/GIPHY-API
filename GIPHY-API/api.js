$(function() {
	populateButtons(animals, "animalButton", "#animalButtons");
});

var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog", "giraffe", "elephant", "tiger", "rhinoceros", "hippopotamus", "alligators", "snakes", "spiders", "turtles", "ostriches", "penguins", "panda", "lions"];


//function to make buttons and add to page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

//When you click on the animal button
$(document).on('click', '.animalButton', function(){
    $('#addAnimal').removeClass('active');
    $(this).addClass('active');
//sets the type on the giphy search
    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=063b737a071c496499c687f65604a1b3";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;


//Loop that switches between still and animated
         for(var i=0; i < results.length; i++){
             var animalDiv = $('<div class="animal-item">')
//puts in the rating for the giphy
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var animalImage = $('<img>');
             animalImage.attr('src', still);
             animalImage.attr('data-still', still);
             animalImage.attr('data-animate', animated);
             animalImage.attr('data-state', 'still')
             animalImage.addClass('animalImage');
//Made it prepend, so the user can see the new images once button is clicked
             animalDiv.prepend(p)
             animalDiv.prepend(animalImage)

             $('#animals').prepend(animalDiv);
         }
});
});

//switches the state, if it's still, it will animate and vice versa
$(document).on('click', '.animalImage', function(){
    var state = $(this).attr('data-state'); 
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//adds new animal by user
$('#addAnimal').on('click', function(){
    var newAnimal = $('input').eq(0).val();

    if (newAnimal.length > 2){
        animals.push(newAnimal);
    }

    populateButtons(animals, 'animalButton', '#animalButtons');

    return false;
});