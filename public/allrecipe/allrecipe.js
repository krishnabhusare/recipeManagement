const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/allRecipe/get-allRecipe')
        .then(result => {

            for (let i = 0; i < result.data.allRecipe.length; i++) {
                showAllRecipeOnScreen(result.data.allRecipe[i]);

            }




        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})











function showAllRecipeOnScreen(obj) {
    document.getElementById('allrecipies').innerHTML += `<li id="${obj.id}">
    ${obj.recipeName}--${obj.content}--${obj.procedure} <button onclick="showComments(${obj.id})">comments</button>
    </li>`
}

function showComments(recipeid) {

    document.getElementById(`${recipeid}`).innerHTML += `<form onsubmit=postComment(event,${recipeid})><input id="comment" name="comment"  placeholder="enter your comment..."><button>post</button></form>`;

    axios.get(`http://localhost:3000/allRecipe/get-allcomments/${recipeid}`, { headers: { Authorization: token } })
        .then(result => {

            for (let i = 0; i < result.data.allcomments.length; i++) {
                showCommentsOnScreen(result.data.allcomments[i], recipeid, result.data.allcomments[i].user.name);
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })

}

function postComment(e, recipeid) {
    e.preventDefault();
    const commentDetails = {
        comment: e.target.comment.value,
        recipeid
    }

    axios.post('http://localhost:3000/allRecipe/add-comment', commentDetails, { headers: { Authorization: token } })
        .then(result => {

            showCommentsOnScreen(result.data.comments, recipeid, result.data.username);
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showCommentsOnScreen(obj, recipeid, name) {
    document.getElementById(`${recipeid}`).innerHTML += `<div style="color:green">${obj.comment}--${name}</div>`
}



