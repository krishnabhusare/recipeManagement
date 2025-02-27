

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/favorite/get-favoriteRecipe', { headers: { Authorization: token } })
        .then(result => {

            result.data.user.recipes.forEach(element => {
                showRecipeOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})

function showRecipeOnScreen(arr) {

    document.getElementById('favoriteRecipe').innerHTML += `<li id="recipe-${arr.id}">${arr.recipename}<button onclick="viewDetails(${arr.id})">view details..</button><button onclick="removeFromfavorite(${arr.id})">Remove From Favorite</button><button onclick="collection(${arr.id})">add to collection</button></li>`
}

function collection(recipeid) {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/favorite/get-collection', { headers: { Authorization: token } })
        .then(result => {
            document.getElementById('favorite').innerHTML += '<h1>Click on bellow collection to add</h1>'
            result.data.collection.forEach(element => {
                showCollectionOnScreen(element, recipeid);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showCollectionOnScreen(obj, recipeid) {

    document.getElementById('favorite').innerHTML += `<li onclick="addToCollection(${obj.id},${recipeid})">${obj.name}</li>`
}

function addToCollection(collectionid, recipeid) {
    axios.post('http://localhost:3000/favorite/add-tocollection', { collectionid, recipeid })
        .then(result => {
            alert('added to collection');
            document.getElementById('favorite').innerHTML = "";

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function viewDetails(id) {

    axios.get(`http://localhost:3000/recipe/get-detailedrecipe/${id}`)
        .then(result => {
            const stringifiedRecipeDetails = JSON.stringify(result.data.recipeDetails);
            localStorage.setItem('recipeDetails', stringifiedRecipeDetails);
            showDetailedRecipeOnScreen(result.data.recipeDetails);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })


}

function showDetailedRecipeOnScreen(obj) {
    document.getElementById('favoriteRecipe').innerHTML = "";

    document.getElementById('favoriteRecipe').innerHTML += `<h3 style= "color:red">${obj.recipename}</h3><p>${obj.description}</p><br><li>cooking time:${obj.cookingtime}</li> <li>Serves:${obj.serves}</li>
      <li>Cuisine:${obj.cuisin}</li>
      <li>Main Ingredient:${obj.mainingredient}</li>
      <li>ingredient:${obj.ingredient}</li>
      <li>method:${obj.method}</li>
      <br>
      <img src="${obj.imageurl}" alt="">
      <button style="color:red" onclick="editDEtails(${obj.id})">Edit Details</button>`
}


function removeFromfavorite(recipeid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/favorite/remove-fromfavorite/${recipeid}`, { headers: { Authorization: token } })
        .then(result => {
            removeRecipeOnScreen(recipeid);
            alert('removed from favorite');

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function removeRecipeOnScreen(recipeid) {
    document.getElementById(`recipe-${recipeid}`).remove();
}








