
function login(e) {
    e.preventDefault();
    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post('http://localhost:3000/user/login', loginDetails)
        .then(result => {
            const token = result.data.token;

            localStorage.setItem('token', token);
            if (result.data.user[0].isAdmin) {
                window.location.href = '../admin/admin.html'
            } else {
                window.location.href = '../homepage/homepage.html'
            }

        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}