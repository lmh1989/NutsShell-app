$(document).ready(function(){

// declare global variable to be overwritten by appendata function
var recipe;

fetch('recipes.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    
    //get the container
    var mainContainer = document.getElementById("recipe");
    
    // getting URL search params
    var urlParams = new URLSearchParams(window.location.search);
    
    // loop through all of recipes
    for (var i = 0; i < data.length; i++) {

        // add unique identifier param to JSON data
        data[i]["indexVal"] = i;
        
        // get url as a string "localhost"
        var needle = urlParams.toString(); 
        // remove any param characters not needed
        var needleSubstr = needle.replace("=", "");

        // if unique param value is the same then output the recipe
        if (data[i].indexVal == needleSubstr){
            
            recipe = data[i];

            //get string from object
            var formattedIngredients = data[i].ingredients.toString();
            var ingredients = formattedIngredients.split(",")
            
            for (var j = 0; j < data[i].ingredients.length; j++) {
                $('#ingredients').append('<p>' + data[i].ingredients[j].amount + ' ' + recipe.ingredients[j].unit + ' ' + recipe.ingredients[j].name + '</p>');
            }

            //get string from object
            var formattedDirections = data[i].directions.toString(); 
            var directionValues = formattedDirections.split(".,").join("<p>")


            // check if the prep time value if undefined as to whether the field is output
            if (data[i].prep_time_min != undefined){
              var prep = "<p><i class='las la-clock'>&nbsp;</i>Prep Time: " + data[i].prep_time_min + " minutes</p>"

            } else {
                  var prep = "";
            }

            // check if the cooking time value if undefined as to whether the field is output
            if (data[i].cook_time_min != undefined){
              var cook = "<p><i class='las la-clock'>&nbsp;</i>Cooking Time: " + data[i].cook_time_min + " minutes</p>"

            } else {
                  var cook = "";
            }

            // create div element to append JSON to
            var div = document.createElement("div");
            
            // outputting values into the page
            $('#recipe .main.recipe').attr('src', data[i].image_src);
            $('#recipe .recipe-name').html(data[i].title);
            $('#recipe .author-name').html(data[i].author.name);
            $('#recipe .author-link a').attr('href', data[i].author.url);
            $('#recipe .description').html(data[i].description);
            $('#recipe .prep').html(prep);
            $('#recipe .cook').html(cook);
            $('#recipe .servings').html(data[i].servings);
            $('#recipe .directions').html(directionValues);

           // end the loop count
           break;

        }

    }
}
  
// Listen for click on submit button
$('.submit').on('click', function(e) {

    // prevent usual form action
    e.preventDefault();
        
    // Get value from text box for serving size
	var newServingSize = $('.servingSize').val();

    // Get number of servings from recipe
	var servings = recipe.servings;
    
    //empty ingredients div
    $('#ingredients').html("");

	// Loop through ingredients
	for (var i = 0; i<recipe.ingredients.length; i++) {
        
        // If the ingredient has an amount
        if (recipe.ingredients[i].amount != '') {
            
           // Get individual portion size
            var individual = eval(recipe.ingredients[i].amount) / servings;

            // Calculate new amount based on individual amount * desired serving size
            var newAmount = Math.round((individual * newServingSize) * 100) / 100;
            
            // Create fraction after calculating decimal
            newAmount = new Fraction(newAmount);
            
            // append ingredient to page
            $('#ingredients').append('<p>' + newAmount + ' ' + recipe.ingredients[i].unit + ' ' + recipe.ingredients[i].name + '</p>');
            
        } else {
            // append ingredient to page
            $('#ingredients').append('<p>' + recipe.ingredients[i].amount + ' ' + recipe.ingredients[i].unit + ' ' + recipe.ingredients[i].name + '</p>');
        }
	}

});

    // initialise animate on scroll
    AOS.init({
        duration: 1600,
        disable: 'mobile',
    });
   


});


        
  