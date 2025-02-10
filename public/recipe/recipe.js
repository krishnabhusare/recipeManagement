const token = localStorage.getItem('token');
function recipe(e) {
    e.preventDefault();
    const recipeDetails = {
        recipeName: e.target.recipeName.value,
        content: e.target.content.value,
        procedure: e.target.procedure.value
    }



    axios.post('http://localhost:3000/recipe/add-recipe', recipeDetails, { headers: { Authorization: token } })
        .then(result => {
            showRecipeOnScreen(result.data.recipe);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showRecipeOnScreen(obj) {
    document.getElementById('userRecipe').innerHTML += `<li id="${obj.id}">${obj.recipeName}--${obj.content}--${obj.procedure}<button onclick="deleteRecipe(${obj.id})">Delete</button></li>`
}

function deleteRecipe(recipeid) {
    axios.delete(`http://localhost:3000/recipe/delete-recipe/${recipeid}`, { headers: { Authorization: token } })
        .then(result => {
            removeRecipeFromScreen(recipeid);

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function removeRecipeFromScreen(recipeid) {
    document.getElementById(`${recipeid}`).remove();
}

window.addEventListener('DOMContentLoaded', () => {

    axios.get('http://localhost:3000/recipe/get-recipe', { headers: { Authorization: token } })
        .then(result => {
            for (let i = 0; i < result.data.recipies.length; i++) {
                showRecipeOnScreen(result.data.recipies[i]);
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})