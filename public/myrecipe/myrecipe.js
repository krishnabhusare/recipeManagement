window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios.get('http://13.234.231.9:3000/recipe/get-myrecipe', { headers: { Authorization: token } })
        .then(result => {


            for (let i = 0; i < result.data.recipe.length; i++) {
                showRecipeOnScreen(result.data.recipe[i]);
            }


        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})


function showRecipeOnScreen(arr) {

    document.getElementById('myrecipe').innerHTML += `<li id="recipe-${arr.id}">${arr.recipename}<button onclick="viewDetails(${arr.id})">view details..</button><button onclick="deleteRecipe(${arr.id})">Delete</button></li>`
}

function deleteRecipe(recipeid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://13.234.231.9:3000/recipe/delete-recipe/${recipeid}`, { headers: { Authorization: token } })
        .then(result => {
            removeRecipeOnScreen(recipeid);
            alert('recipe deleted ');

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function removeRecipeOnScreen(recipeid) {
    document.getElementById(`recipe-${recipeid}`).remove();
}

function viewDetails(id) {

    axios.get(`http://13.234.231.9:3000/recipe/get-detailedrecipe/${id}`)
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
    document.getElementById('myrecipe').innerHTML = "";

    document.getElementById('recipedetails').innerHTML += `<h3 style= "color:red">${obj.recipename}</h3><p>${obj.description}</p><br><li>cooking time:${obj.cookingtime}</li> <li>Serves:${obj.serves}</li>
      <li>Cuisine:${obj.cuisin}</li>
      <li>Main Ingredient:${obj.mainingredient}</li>
      <li>ingredient:${obj.ingredient}</li>
      <li>method:${obj.method}</li>
      <br>
      <img src="${obj.imageurl}" alt="">
      <button style="color:red" onclick="editDEtails(${obj.id})">Edit Details</button>`
}


const editDEtails = (recipeid) => {

    document.getElementById('recipedetails').innerHTML = "";
    document.body.innerHTML += `
    <h3>edit recipe</h3>
    <form onsubmit="update(event,${recipeid})">
        <label for="recipename">Recipe Name:</label>
        <br>
        <input type="text" name="recipename" id="recipename">
        <br>
        <label for="description">Description:</label>
        <br>
        <input type="text" name="description" id="description">
        <br>
        <label for="ingredient">Ingredients:</label>
        <br>
        <textarea name="ingredient" id="ingredient"></textarea>
        <br>
        <label for="method">Method:</label>
        <br>
        <textarea name="method" id="method"></textarea>
        <br>
        <label for="cuisin">Cuisin</label>
        <br>
        <select name="cuisin" id="cuisin">

            <option value="cakes">Cakes</option>
            <option value="drinks">Drinks</option>
            <option value="starter">starter</option>
            <option value="juice">juice</option>
            <option value="salad">salad</option>
        </select>
        <br>
        <label for="mainingredient">Main Ingredient:</label>
        <br>
        <select name="mainingredient" id="mainingredient">
            <option value="beans">beans</option>
            <option value="beef">beef</option>
            <option value="paneer">paneer</option>
            <option value="egg">egg</option>
            <option value="fish">fish</option>
            <option value="potato">potato</option>
            <option value="vegetables">vegetables</option>
        </select>
        <br>
        <label for="cookingtime">Cooking Time:</label>
        <br>
        <select name="cookingtime" id="cookingtime">
            <option value="5min">upto 5 min</option>
            <option value="10min">10 min</option>
            <option value="10-15min"> 10-15 min</option>
            <option value="15-20min">15-20 min</option>
        </select>
        <br>
        <label for="serves">Serves:</label>
        <br>
        <select name="serves" id="serves">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <br>
        <label for="keyword">Kwywords:</label>
        <br>
        <input type="text" name="keyword" id="keyword" placeholder="saperate keyword , comma">
        <br>
        <label for="uploadphoto">Upload Photo:</label>
        <br>
        <input type="file" name="uploadphoto" id="uploadphoto">
        <br><br>
        <button>
        Update</button>
    </form>
   

    `
    const recipeObj = JSON.parse(localStorage.getItem('recipeDetails'));
    document.getElementById('recipename').value = `${recipeObj.recipename}`;
    document.getElementById('description').value = `${recipeObj.description}`;
    document.getElementById('ingredient').value = `${recipeObj.ingredient}`;
    document.getElementById('method').value = `${recipeObj.method}`;
    document.getElementById('cuisin').value = `${recipeObj.cuisin}`;
    document.getElementById('mainingredient').value = `${recipeObj.mainingredient}`;
    document.getElementById('cookingtime').value = `${recipeObj.cookingtime}`;
    document.getElementById('serves').value = `${recipeObj.serves}`;
    document.getElementById('keyword').value = `${recipeObj.keyword}`;




}

function update(e, recipeid) {
    e.preventDefault();
    const recipename = e.target.recipename.value;
    const description = e.target.description.value;
    const ingredient = e.target.ingredient.value;
    const method = e.target.method.value;
    const cuisin = e.target.cuisin.value;
    const mainingredient = e.target.mainingredient.value;
    const cookingtime = e.target.cookingtime.value;
    const serves = e.target.serves.value;
    const keyword = e.target.keyword.value;





    const uploadphoto = e.target.uploadphoto.files[0];

    const formData = new FormData();
    formData.append("recipename", recipename);
    formData.append("image", uploadphoto);
    formData.append('description', description);
    formData.append('ingredient', ingredient);
    formData.append('method', method);
    formData.append('cuisin', cuisin);
    formData.append('mainingredient', mainingredient);
    formData.append('cookingtime', cookingtime);
    formData.append('serves', serves);
    formData.append('keyword', keyword);

    const token = localStorage.getItem('token');

    axios.put(`http://13.234.231.9:3000/recipe/update-recipe/${recipeid}`, formData, { headers: { Authorization: token } })
        .then(result => {
            alert('recipe updated');
            window.location.href = '../myrecipe/myrecipe.html'
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })



}

