function createCollection(e) {
    e.preventDefault();
    const collectionDetails = {
        name: e.target.name.value
    };
    const token = localStorage.getItem('token');

    axios.post('http://localhost:3000/favorite/create-collection', collectionDetails, { headers: { Authorization: token } })
        .then(result => {

            showCollectionOnScreen(result.data.collection);

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showCollectionOnScreen(obj) {

    document.getElementById('mycollection').innerHTML += `<li onclick="insideCollection(${obj.id})">${obj.name}</li>`
}

function insideCollection(collectionid) {

    document.getElementById('mycollection').innerHTML = "";
    axios.get(`http://localhost:3000/favorite/get-recipeincollection/${collectionid}`)
        .then(result => {
            result.data.recipecollection.recipes.forEach(element => {
                showRecipeOnScreen(element, collectionid);
            });

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })

}
function showRecipeOnScreen(arr, collectionid) {

    document.getElementById('mycollection').innerHTML += `<li id="recipe-${arr.id}">${arr.recipename}<button onclick="viewDetails(${arr.id})">view details..</button><button onclick="removeRecipeFromCollection(${arr.id},${collectionid})">Remove From Collection</button></li>`
}

function removeRecipeOnScreen(recipeid) {
    document.getElementById(`recipe-${recipeid}`).remove();
}

function removeRecipeFromCollection(recipeid, collectionid) {

    axios.delete(`http://localhost:3000/favorite/removeRecipeFromCollection/${recipeid}/${collectionid}`)
        .then(result => {

            removeRecipeOnScreen(recipeid);
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
    document.getElementById('mycollection').innerHTML = "";

    document.getElementById('mycollection').innerHTML += `<h3 style= "color:red">${obj.recipename}</h3><p>${obj.description}</p><br><li>cooking time:${obj.cookingtime}</li> <li>Serves:${obj.serves}</li>
      <li>Cuisine:${obj.cuisin}</li>
      <li>Main Ingredient:${obj.mainingredient}</li>
      <li>ingredient:${obj.ingredient}</li>
      <li>method:${obj.method}</li>
      <br>
      <img src="${obj.imageurl}" alt="">
      `
}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/favorite/get-collection', { headers: { Authorization: token } })
        .then(result => {
            result.data.collection.forEach(element => {
                showCollectionOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})