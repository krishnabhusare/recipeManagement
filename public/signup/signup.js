function signup(e) {
    e.preventDefault();
    const signupDetails = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post('http://localhost:3000/user/signup', signupDetails)
        .then(result => {
            window.location.href = '../login/login.html'
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}