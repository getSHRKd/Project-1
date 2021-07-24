$(document).ready(function(){
    $('select').formSelect();

  });
  M.AutoInit()
  $(".dropdown-trigger").dropdown();

  $('.modal').modal();

/* let apiKey = '3aab51ba2fc442daa3d8eb0041b0be76'; // Ronald*/
 let apiKey = 'e0ab4916329e48aebf5b04da43be417f';  // Rich
/* let apiKey = 'dfba0426536b466aaa28376e4b407fe8'; // Scott */

$("#in").click(function() {
  document.getElementById("recipeSearch").style.display = "block";
  document.getElementById("restaurantSearch").style.display = "none";
  document.getElementById("restaurantSearchByCity").style.display = "none";
});
$("#out").click(function() {
  document.getElementById("restaurantSearch").style.display = "block";
  document.getElementById("restaurantSearchByCity").style.display = "block";
  document.getElementById("recipeSearch").style.display = "none";
});

// SPOONACULAR RECIPE API 
let recipe;
$("#recipeButton").click(function () {
    let query = $('#searchRecipe').val();
    let checkedCuisines = M.FormSelect.getInstance(document.querySelector(".cuisineChoices")).getSelectedValues();
    let cuisines = checkedCuisines.toString();
    let endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisines}`
    $("#recipeDisplay").html('')

    $.ajax({
        url: endpoint,
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            console.log(result);
            for (i = 0; i < result.results.length; i++) {
            getRecipeDetails(result.results[i].id)
            }
        }
    })
});

//GOOGLE PLACES RESTAURANT API
let restaurant;
$("#cityButton").click(function () {
	console.log("button clicked")
	let cityQuery = $("#searchCity").val();
	let endpoint2 = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${cityQuery}&fields=name,rating,photos,formatted_address&key=${api2}`

	$.ajax({
		url: endpoint2,
		dataType: "json",
		success: function (result) {
			console.log(result);
            for (i = 0; i < 10; i++) {
            getRestaurantDetails(result.results[i].id)
            }
		    }
	  })
});

// ADD TO MEAL PLAN MODAL
$("main").on("click", ".addToMealPlan", function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("ADD TO MEAL PLAN")
    let button = $(event.target);
    recipe = button.data("recipe")
    console.log(recipe);
    $('.modal').modal('open');
});

$("main").on("click", ".addToMealPlan", function(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log("ADD TO MEAL PLAN")
  let button = $(event.target);
  restaurant = button.data("restaurant")
  console.log(restaurant);
  $('.modal').modal('open');
});


// CLICK FUNCTION TO ADD MEAL TO MEAL PLAN
$(".day").on("click", function(event) {
    console.log("CLICKED DAY")
    let button = $(event.target);
    let day = button.data("day")
    addRecipeToMealPlanner(recipe, day);
    $('.modal').modal('close');
})

$(".day").on("click", function(event) {
  console.log("CLICKED DAY")
  let button = $(event.target);
  let day = button.data("day")
  addRestaurantToMealPlanner(restaurant, day);
  $('.modal').modal('close');
})

function addRecipeToMealPlanner(recipe, day) {
    console.log(day, recipe.image)
    localStorage.setItem(day, recipe.title);
    localStorage.setItem(day + 'image', recipe.image);
    localStorage.setItem(day + "recipeUrl", recipe.sourceUrl);
    getMealsFromLocalStorage()
}

function addRestaurantToMealPlanner(restaurant, day) {
  console.log(day, restaurant.image)
  localStorage.setItem(day, restaurant.title);
  localStorage.setItem(day + 'image', recipe.image);
  localStorage.setItem(day + "recipeUrl", recipe.sourceUrl);
  getMealsFromLocalStorage()
}
// SAVING MEAL PLAN TO LOCAL STORAGE
function getMealsFromLocalStorage() {
    console.log("GETTING ITEMS");

    for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
        $(`#${dayNumber}`).text(localStorage.getItem(dayNumber));
        let recipeLink = $('<a>');
        recipeLink.attr('href', localStorage.getItem(dayNumber + "recipeUrl"));
        recipeLink.attr('target', '_blank');
        
        if(localStorage.getItem(dayNumber + "recipeUrl") === null) {
          recipeLink.text('');
        } else {
          recipeLink.text('Click here for recipe');
        }
        $(`#${dayNumber}recipeUrl`).empty().append(recipeLink);
        let recipeImage = $('<img class="recipePhoto">');
        recipeImage.attr('src', localStorage.getItem(dayNumber + "image"));
        $(`#${dayNumber}image`).html('')
        $(`#${dayNumber}image`).append(recipeImage);
    }
}
getMealsFromLocalStorage();

function clearMealPlan() {
    localStorage.clear();
    location.reload();
}
// ADD TO MEAL PLAN BUTTON
function getRecipeDetails(recipeId) {
    let recipeEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    $.ajax({
        url: recipeEndpoint,
        contentType: "application/json",

    })
        .then(function (result) {
            console.log(result)
            let recipeDiv = $('#recipeDisplay');
            let recipeTitle = $('<h5>');
            let recipeImage = $('<img class="recipePhoto">');
            let recipeSummary = $('<p>');
            let recipeName = $('<div  class="recipeNameAndButton">')
            let recipeURL = $('<a>');
            let recipeInfo = $("<div class='recipeInfo'>");
            let addToMealPlannerButton = $("<button class='addToMealPlan'>");
            addToMealPlannerButton.text("Add to Meal Plan")
            .addClass("waves-effect waves-light btn")
            .data("recipe", result);

            recipeInfo.append(recipeImage, recipeSummary);
            recipeTitle.text(result.title);
            recipeImage.attr('src', result.image);
            recipeSummary.html(result.summary);
            recipeURL.append(recipeTitle);
            recipeURL.attr('href', result.sourceUrl);
            recipeURL.attr('target', '_blank');
            recipeName.append(recipeURL, addToMealPlannerButton)
            recipeDiv.append(recipeName, recipeInfo);
        })
}


//business_status: ""