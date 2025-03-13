function login(e) {
    e.preventDefault();
    const loginDeatils = {
        email: e.target.email.value,
        password: e.target.password.value
    }


    axios.post('http://localhost:5000/login/user-login', loginDeatils)
        .then(result => {

            localStorage.setItem('token', result.data.token);

            showAlert();

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showAlert() {
    let alertBox = document.getElementById('alertBox');
    alertBox.classList.add('show');

    setTimeout(() => {
        alertBox.classList.remove('show');
        window.location.href = '../homepage/homepage.html';
    }, 3000);
}