function profile(e) {
    e.preventDefault();
    const profileDetails = {
        newpassword: e.target.newpassword.value,
        displayname: e.target.displayname.value
    }

    const token = localStorage.getItem('token');

    axios.post('http://localhost:3000/profile/edit-profile', profileDetails, { headers: { Authorization: token } })
        .then(result => {
            localStorage.setItem('token', result.data.token);
            window.location.href = '../homepage/homepage.html'
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function followUsers() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/follow/get-usersToFollow', { headers: { Authorization: token } })
        .then(result => {
            result.data.users.forEach(element => {
                showUsersOnScreen(element);
            });
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showUsersOnScreen(arr) {
    document.getElementById('users').innerHTML += `<li id="${arr.id}">${arr.name}<button onclick="follow(${arr.id})">follow</button></li>`
}

function follow(userid) {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/follow/followUsers', { userid }, { headers: { Authorization: token } })
        .then(result => {
            alert('followed');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function seeFollowing() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/follow/get-following', { headers: { Authorization: token } })
        .then(result => {

            result.data.arr.forEach(element => {
                showFollowingOnScreen(element);
            })

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showFollowingOnScreen(arr) {
    document.getElementById('following').innerHTML += `<li id="${arr.id}">${arr.name}<button onclick="unfollow(${arr.id})">unfollow</button></li>`
}

function unfollow(userid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/follow/unfollow/${userid}`, { headers: { Authorization: token } })
        .then(result => {
            removeUserFromScreen(userid);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function removeUserFromScreen(id) {
    document.getElementById(`${id}`).remove();
}



function seeFollowers() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/follow/get-followers', { headers: { Authorization: token } })
        .then(result => {
            result.data.arr.forEach(element => {
                showFollowersOnscreen(element);
            })
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showFollowersOnscreen(arr) {
    document.getElementById('followers').innerHTML += `<li>${arr.name}</li>`
}

function notifications() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/activity/get-notification', { headers: { Authorization: token } })
        .then(result => {

            document.getElementById('notifications').innerHTML = "";
            for (let i = 0; i < result.data.activities.length; i++) {
                showNotificationsOnScreen(result.data.activities[i], result.data.recipename);
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showNotificationsOnScreen(obj, recipename) {
    document.getElementById('notifications').innerHTML += `<li>${obj.user.name} --${obj.action}-${recipename}-on${obj.updatedAt}</li>`
}

