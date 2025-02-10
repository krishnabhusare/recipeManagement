function login(e) {
    e.preventDefault();
    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post('http://localhost:3000/user/login', loginDetails)
        .then(result => {
            localStorage.setItem('token', result.data.token);

            if (result.data.user[0].isAdmin == 1) {
                return window.location.href = '../admin/admin.html'
            }
            else {
                window.location.href = '../recipe/recipe.html'
            }


        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}