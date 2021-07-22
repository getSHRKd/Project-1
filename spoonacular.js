$(document).ready(function(){
    $('select').formSelect();

// read mealPlan from local storage
// if mealPlan == null
// create mealPlan array [{}, {}, {},{}, {},{},{}]

  });
  M.AutoInit()
  $(".dropdown-trigger").dropdown();

  $('.modal').modal();

 let apiKey = '3aab51ba2fc442daa3d8eb0041b0be76'; // Ronald
/* let apiKey = 'e0ab4916329e48aebf5b04da43be417f';  */// Rich
/* let apiKey = 'dfba0426536b466aaa28376e4b407fe8'; // Scott */
let recipe;
$("#recipeButton").click(function () {
    let query = $('#searchRecipe').val();
    let checkedCuisines = M.FormSelect.getInstance(document.querySelector(".cuisineChoices")).getSelectedValues();
    let cuisines = checkedCuisines.toString();
    let checkedDiet = M.FormSelect.getInstance(document.querySelector(".dietChoices")).getSelectedValues();
    let diet = checkedDiet.toString();
    let endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisines}&diet=${diet}`

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

$("main").on("click", ".addToMealPlan", function(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("ADD TO MEAL PLAN")
    let button = $(event.target);
    recipe = button.data("recipe")
    console.log(recipe);
    $('.modal').modal('open');
});

$(".day").on("click", function(event) {
    console.log("CLICKED DAY")
    let button = $(event.target);
    let day = button.data("day")
    addRecipeToMealPlanner(recipe, day);
    $('.modal').modal('close');
    getMealsFromLocalStorage();
})

function addRecipeToMealPlanner(recipe, day) {
    console.log(day, recipe.image)
    localStorage.setItem(day, recipe.title);
    localStorage.setItem(day + 'image', recipe.image);
    localStorage.setItem(day + "recipeUrl", recipe.sourceUrl);
    let recipeImage = $('<img class="recipePhoto">');
    recipeImage.attr('src', recipe.image);
    let recipeLink = $('<a>')
    recipeLink.attr('href', recipe.sourceUrl);
    recipeLink.text('Click here for recipe');
    recipeLink.attr('target', '_blank');
    console.log(recipeLink);
    $(`#${day}`).text(recipe.title);
    $(`#${day}image`).append(recipeImage);
    $(`#${day}recipeUrl`).append(recipeLink);
    console.log(recipeLink);

    // add to local storage
    // day wil be the index of the day of the week (starting at 0 for Sunday)
    // mealPlan[day] = recipe
}

function getMealsFromLocalStorage() {
    console.log("GETTING ITEMS");
    $('#0').text(localStorage.getItem("0"));
    $('#1').text(localStorage.getItem("1"));
    $('#2').text(localStorage.getItem("2"));
    $('#3').text(localStorage.getItem("3"));
    $('#4').text(localStorage.getItem("4"));
    $('#5').text(localStorage.getItem("5"));
    $('#6').text(localStorage.getItem("6")); 

    let recipeLink0 = $('<a>');
    recipeLink0.attr('href', localStorage.getItem("0recipeUrl"));
    recipeLink0.text('Click here for recipe');
    recipeLink0.attr('target', '_blank');
    $('#0recipeUrl').append(recipeLink0);
    let recipeLink1 = $('<a>');
    recipeLink1.attr('href', localStorage.getItem("1recipeUrl"));
    recipeLink1.text('Click here for recipe');
    recipeLink1.attr('target', '_blank');
    $('#1recipeUrl').append(recipeLink1);
    let recipeLink2 = $('<a>');
    recipeLink2.attr('href', localStorage.getItem("2recipeUrl"));
    recipeLink2.text('Click here for recipe');
    recipeLink2.attr('target', '_blank');
    $('#2recipeUrl').append(recipeLink2);
    let recipeLink3 = $('<a>');
    recipeLink3.attr('href', localStorage.getItem("3recipeUrl"));
    recipeLink3.text('Click here for recipe');
    recipeLink3.attr('target', '_blank');
    $('#3recipeUrl').append(recipeLink0);
    let recipeLink4 = $('<a>');
    recipeLink4.attr('href', localStorage.getItem("4recipeUrl"));
    recipeLink4.text('Click here for recipe');
    recipeLink4.attr('target', '_blank');
    $('#4recipeUrl').append(recipeLink4);
    let recipeLink5 = $('<a>');
    recipeLink5.attr('href', localStorage.getItem("5recipeUrl"));
    recipeLink5.text('Click here for recipe');
    recipeLink5.attr('target', '_blank');
    $('#5recipeUrl').append(recipeLink5);
    let recipeLink6 = $('<a>');
    recipeLink6.attr('href', localStorage.getItem("6recipeUrl"));
    recipeLink6.text('Click here for recipe');
    recipeLink6.attr('target', '_blank');
    $('#6recipeUrl').append(recipeLink6);

    let recipeImage0 = $('<img class="recipePhoto">');
    recipeImage0.attr('src', localStorage.getItem("0image"));
    $('#0image').append(recipeImage0);
    let recipeImage1 = $('<img class="recipePhoto">');
    recipeImage1.attr('src', localStorage.getItem("1image"));
    $('#1image').append(recipeImage1);
    let recipeImage2 = $('<img class="recipePhoto">');
    recipeImage2.attr('src', localStorage.getItem("2image"));
    $('#2image').append(recipeImage2);
    let recipeImage3 = $('<img class="recipePhoto">');
    recipeImage3.attr('src', localStorage.getItem("3image"));
    $('#3image').append(recipeImage3);
    let recipeImage4 = $('<img class="recipePhoto">');
    recipeImage4.attr('src', localStorage.getItem("4image"));
    $('#4image').append(recipeImage4);
    let recipeImage5 = $('<img class="recipePhoto">');
    recipeImage5.attr('src', localStorage.getItem("5image"));
    $('#5image').append(recipeImage5);
    let recipeImage6 = $('<img class="recipePhoto">');
    recipeImage6.attr('src', localStorage.getItem("6image"));
    $('#6image').append(recipeImage6);
}
getMealsFromLocalStorage();

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