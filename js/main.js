$(document).ready(function(){

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
        var mainContainer = document.getElementById("recipes");
        
        for (var i = 0; i < data.length; i++) {
            
            data[i]["indexVal"] =i;
            
            var div = document.createElement("div");

            div.classList.add("col-12", "col-md-6", "col-lg-4", "mb-5", "text-center");

            div.innerHTML = "<div class='indivRecipe' data-aos='fade-left'><a href='recipe.html?=" + data[i].indexVal + "'>" + "<div class='item-wrapper mb-0'>" + "<img class='main' src='" + data[i].image_src + "'/><span>View Recipe</span>" + "</div><div class='pt-4 pb-4 pl-2 pr-2 blue-bg'><p class='recipe-name mb-1'>" + data[i].title + "</p>" + "<p class='small mb-0'>By: " + data[i].author.name + "</p></div></a></div>";
            mainContainer.appendChild(div);
        }

    }

});
