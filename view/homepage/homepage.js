function bann() {
    axios.get('http://localhost:5000/users/get-user')
        .then(result => {
            document.getElementById('userss').innerHTML = "";

            result.data.forEach(element => {
                showUsersOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}


function showUsersOnScreen(arr) {
    document.getElementById('userss').innerHTML += `<li id="${arr.id}">${arr.name} <button onclick="deleteUsers(${arr.id})">🚫 Ban User</button></li>`
}

function deleteUsers(userid) {
    axios.delete(`http://localhost:5000/delete/delete-user/${userid}`)
        .then(result => {
            alert('deleted');
            removeFromScreen(userid);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function removeFromScreen(id) {
    document.getElementById(`${id}`).remove();
}


function recipe() {
    axios.get('http://localhost:5000/recipe/get-recipe')
        .then(result => {
            document.getElementById('recipes').innerHTML = "";
            result.data.forEach(element => {
                showRecipeOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showRecipeOnScreen(arr) {
    document.getElementById('recipes').innerHTML += `<li id="${arr.id}">${arr.recipename}<button onclick="deleteRecipe(${arr.id})">❌ Delete Recipe</button></li>`
}
function deleteRecipe(recipeid) {
    axios.delete(`http://localhost:5000/recipe/delete-recipe/${recipeid}`)
        .then(result => {
            alert('deleted');
            removeFromScreen(recipeid);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function adminDelete() {
    const token = localStorage.getItem('token');



    axios.get('http://localhost:5000/admin/get-admin', { headers: { Authorization: token } })
        .then(result => {

            document.getElementById('admin').innerHTML = "";
            for (let i = 0; i < result.data.length; i++) {
                showAdminOnScreen(result.data[i]);
            }

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showAdminOnScreen(arr) {
    document.getElementById('admin').innerHTML += `<li >${arr.email}<button onclick="deleted(${arr.id})">❌ Delete</button><button onclick="approve(${arr.id})">✅ Approve</button></li>`
}

function deleted(id) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/admin/delete-admin/${id}`, { headers: { Authorization: token } })
        .then(result => {
            alert('deleted');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function approve(id) {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/admin/approve-admin/${id}`, { headers: { Authorization: token } })
        .then(result => {
            alert('approved');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}




