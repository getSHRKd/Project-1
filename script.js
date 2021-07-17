console.log("hello");
let planTemplateURL = "https://api.spoonacular.com/mealplanner/public-templates?apiKey=3aab51ba2fc442daa3d8eb0041b0be76"
let mealPlanTemplate = document.querySelector('#meal-plan-template');

$.get(planTemplateURL)
    .then(function(data){
        console.log(data.templates[0]);
    })

let getPlanUrl = `https://api.spoonacular.com/mealplanner/templates/125?apiKey=3aab51ba2fc442daa3d8eb0041b0be76`;

$.get(getPlanUrl)
    .then(function(data){
        console.log(data)
    })