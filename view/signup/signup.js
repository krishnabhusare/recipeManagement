function signup(e) {
    e.preventDefault();
    const signupDetails = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post('http://localhost:5000/admin/add-admin', signupDetails)
        .then(result => {
            alert('signup successfull');
            window.location.href = '../login/login.html';
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}