$(document).ready(function(){
    $('select').formSelect();
  });
  M.AutoInit()
  $(".dropdown-trigger").dropdown();

let apiKey = '3aab51ba2fc442daa3d8eb0041b0be76';

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
            let recipeURL = $('<a>');
            let recipeInfo = $("<div class='recipeInfo'>");
            recipeInfo.append(recipeImage, recipeSummary);
            recipeTitle.text(result.title);
            recipeImage.attr('src', result.image);
            recipeSummary.html(result.summary);
            recipeURL.append(recipeTitle);
            recipeURL.attr('href', result.sourceUrl);
            recipeURL.attr('target', '_blank');
            recipeDiv.append(recipeURL, recipeInfo);
        })
}