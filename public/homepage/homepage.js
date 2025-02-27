const token = localStorage.getItem('token');


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const decreptedToken = parseJwt(token);

document.getElementById('login').innerHTML = "";
document.getElementById('login').innerHTML += ` 
    <h3 style="color:green">Welcome ${decreptedToken.userName}</h3>
    <a href="../myaccount/myaccount.html">My Account</a>
    <a href="../login/login.html">..|..Logout</a>`


window.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('filterObj');
    axios.get('http://13.234.231.9:3000/search/all-recipe')
        .then(result => {
            result.data.allReciep.forEach(element => {
                showAllRecipeOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})

function showAllRecipeOnScreen(arr) {
    document.getElementById('allrecipies').innerHTML += `<li>${arr.recipename}<button onclick="viewDetails(${arr.id}),getRating(${arr.id})">view Details..</button><button  onclick="favorite(${arr.id})">add to favorite</button></li>`
}


function favorite(recipeid) {
    const token = localStorage.getItem('token');
    axios.post('http://13.234.231.9:3000/favorite/add-favorite', { recipeid }, { headers: { Authorization: token } })
        .then(result => {
            alert('added to favorite');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}


function viewDetails(recipeid) {
    axios.get(`http://13.234.231.9:3000/recipe/get-detailedrecipe/${recipeid}`)
        .then(result => {
            showDetailedRecipeOnScreen(result.data.recipeDetails);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showDetailedRecipeOnScreen(obj) {
    document.getElementById('allrecipies').innerHTML = "";

    document.getElementById('allrecipies').innerHTML += `<h3 style= "color:red">${obj.recipename}</h3><h2>Rate This Recipe</h2><div class="stars">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
    </div><button id="submitRating">Submit Rating</button></p><p>${obj.description}</p><br><li>cooking time:${obj.cookingtime}</li> <li>Serves:${obj.serves}</li>
      <li>Cuisine:${obj.cuisin}</li>
      <li>Main Ingredient:${obj.mainingredient}</li>
      <li>ingredient:${obj.ingredient}</li>
      <li>method:${obj.method}</li>
      <br>
      <img src="${obj.imageurl}" alt="">
      `
    let selectedRating = 0;
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = this.getAttribute("data-value");
            stars.forEach(s => s.classList.remove("selected"));
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add("selected");
            }

        });
    });

    document.getElementById("submitRating").addEventListener("click", async () => {
        if (selectedRating === 0) {
            alert("Please select a rating!");
            return;
        }
        const ratingDetails = {
            selectedRating,
            recipeid: obj.id
        }
        const token = localStorage.getItem('token');
        axios.post('http://13.234.231.9:3000/rating/give-rating', ratingDetails, { headers: { Authorization: token } })
            .then(result => {
                alert("Rating submitted!");

            })
            .catch(err => {
                document.body.innerHTML += `<div style="color:red">${err}</div>`
            })
    })


    document.getElementById('searchRecipe').innerHTML = "";
    document.getElementById('searchRecipe').innerHTML += `<h2>Comments:</h2>
     <form onsubmit="postComment(event,${obj.id})">
        <input type="text" name="comment" id="comment" placeholder="write comment here...">
        <button>post comment</button>
    </form>
    <button onclick="getAllComment(${obj.id})">load all comments</button>`;


}

function getRating(recipeid) {
    axios.get(`http://13.234.231.9:3000/rating/get-rating/${recipeid}`, { headers: { Authorization: token } })
        .then(result => {
            if (result.data.rating.length > 0) {
                const savedRating = result.data.rating[0].rating;

                highlightStars(savedRating);
            }



        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function highlightStars(rating) {
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
        star.style.color = star.getAttribute("data-value") <= rating ? "gold" : "gray";
    });
}

function postComment(e, recipeid) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const comment = e.target.comment.value;
    axios.post('http://13.234.231.9:3000/comment/post-comment', { comment, recipeid }, { headers: { Authorization: token } })
        .then(result => {

            showCommentOnScreen(result.data.commented, result.data.username);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showCommentOnScreen(obj, username) {
    document.getElementById('searchRecipe').innerHTML += `<li >${username}--${obj.comment}</li>`
}

function getAllComment(recipeid) {
    axios.get(`http://13.234.231.9:3000/comment/get-allComment/${recipeid}`)
        .then(result => {
            document.getElementById('allcomments').innerHTML = "";
            result.data.allComment.forEach(element => {
                showAllCommentsOnScreen(element);
            })
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showAllCommentsOnScreen(arr) {

    document.getElementById('allcomments').innerHTML += `<li>${arr.user.name}--${arr.comment}</li>`
}












function searchRecipe(e) {
    e.preventDefault();

    const query = e.target.search.value;
    document.getElementById('search').value = "";
    const filterObj = { query };
    localStorage.setItem('filterObj', JSON.stringify(filterObj));

    axios.get('http://13.234.231.9:3000/search/get-recipe', { params: { query } })
        .then(result => {

            result.data.searchedRecipe.forEach(element => {
                showSerchedRecipeOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showSerchedRecipeOnScreen(arr) {

    document.getElementById('allrecipies').innerHTML = "";

    document.getElementById('searchRecipe').innerHTML += `<li>${arr.recipename}<button onclick="viewDetails(${arr.id})">view Details..</button></li>
   `
    document.getElementById('filters').innerHTML = `
   <h3>Apply Filters</h3>
   
   <label for="cuisin">Cuisin</label>
        <br>
        <select name="cuisin" id="cuisin" onchange="cuisin()">

            <option value="cakes">cakes</option>
            <option value="drinks">drinks</option>
            <option value="starter">starter</option>
            <option value="juice">juice</option>
            <option value="salad">salad</option>
        </select>
        <br>
        <label for="mainingredient">Main Ingredient:</label>
        <br>
        <select name="mainingredient" id="mainingredient" onchange="mainingredient()">
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
        <select name="cookingtime" id="cookingtime" onchange="cookingtime()">
            <option value="5min">upto 5 min</option>
            <option value="10min">10 min</option>
            <option value="10-15min"> 10-15 min</option>
            <option value="15-20min">15-20 min</option>
        </select>
        <br>
        <label for="serves">Serves:</label>
        <br>
        <select name="serves" id="serves" onchange="serves()">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <br>
       
   
   `
}




function cuisin() {

    const filterObj = JSON.parse(localStorage.getItem('filterObj'))

    const cuisin = document.getElementById('cuisin').value;
    localStorage.setItem('filterObj', JSON.stringify({ ...filterObj, cuisin }))
    const query = JSON.parse(localStorage.getItem('filterObj'));



    axios.get('http://13.234.231.9:3000/search/get-recipe', { params: query })
        .then(result => {

            document.getElementById('searchRecipe').innerHTML = "";
            result.data.searchedRecipe.forEach(element => {

                showSerchedRecipeOnScreen(element);

            });
            document.getElementById('cuisin').value = cuisin;

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function mainingredient() {
    const filterObj = JSON.parse(localStorage.getItem('filterObj'))
    const mainingredient = document.getElementById('mainingredient').value;
    localStorage.setItem('filterObj', JSON.stringify({ ...filterObj, mainingredient }))
    const query = JSON.parse(localStorage.getItem('filterObj'));

    axios.get('http://13.234.231.9:3000/search/get-recipe', { params: query })
        .then(result => {
            document.getElementById('searchRecipe').innerHTML = "";
            result.data.searchedRecipe.forEach(element => {
                showSerchedRecipeOnScreen(element);
            });
            document.getElementById('mainingredient').value = mainingredient;
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })

}

function cookingtime() {
    const filterObj = JSON.parse(localStorage.getItem('filterObj'))
    const cookingtime = document.getElementById('cookingtime').value;

    localStorage.setItem('filterObj', JSON.stringify({ ...filterObj, cookingtime }))
    const query = JSON.parse(localStorage.getItem('filterObj'));
    axios.get('http://13.234.231.9:3000/search/get-recipe', { params: query })
        .then(result => {
            document.getElementById('searchRecipe').innerHTML = "";
            result.data.searchedRecipe.forEach(element => {
                showSerchedRecipeOnScreen(element);
            });
            document.getElementById('cookingtime').value = cookingtime;
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })

}

function serves() {
    const filterObj = JSON.parse(localStorage.getItem('filterObj'))

    const serves = document.getElementById('serves').value;
    localStorage.setItem('filterObj', JSON.stringify({ ...filterObj, serves }));
    const query = JSON.parse(localStorage.getItem('filterObj'));
    axios.get('http://13.234.231.9:3000/search/get-recipe', { params: query })
        .then(result => {
            document.getElementById('searchRecipe').innerHTML = "";
            result.data.searchedRecipe.forEach(element => {
                showSerchedRecipeOnScreen(element);
            });
            document.getElementById('serves').value = serves;
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })

}




