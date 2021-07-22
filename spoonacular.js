$(document).ready(function(){
    $('select').formSelect();

// read mealPlan from local storage
// if mealPlan == null
// create mealPlan array [{}, {}, {},{}, {},{},{}]

  });
  M.AutoInit()
  $(".dropdown-trigger").dropdown();

  $('.modal').modal();

// let apiKey = '3aab51ba2fc442daa3d8eb0041b0be76'; // Ronald
/* let apiKey = 'e0ab4916329e48aebf5b04da43be417f'; */ // Rich
let apiKey = 'dfba0426536b466aaa28376e4b407fe8'; // Scott
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
    console.log(day, recipe.title)
    localStorage.setItem(day, recipe.title);
    $(`#${day}`).text(recipe.title);

    // add to local storage
    // day wil be the index of the day of the week (starting at 0 for Sunday)
    // mealPlan[day] = recipe
}
function getMealsFromLocalStorage() {
    $('#monday').val(localStorage.getItem("0"));
    $('#tuesday').val(localStorage.getItem("1"));
    $('#2').val(localStorage.getItem("2"));
    $('#3').val(localStorage.getItem("3"));
    $('#4').val(localStorage.getItem("4"));
    $('#5').val(localStorage.getItem("5"));
    $('#6').val(localStorage.getItem("6"));
}

/* function setMealsFromLocalStorage(){
    localStorage.setItem('0', "Chicken");
} */

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
/* var meal = $('#monday').text();
if (meal) {
    localStorage.setItem('meal', meal);
} */

/* localStorage.setItem('meal', meal);
alert(localStorage.getItem('meal')); */

getMealsFromLocalStorage();
/* setMealsFromLocalStorage(); */