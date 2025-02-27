function forgotPassword(e) {
    e.preventDefault();
    const forgotPasswordDetails = {
        email: e.target.email.value
    }
    axios.post('http://localhost:3000/password/forgot-password', forgotPasswordDetails)
        .then(result => {
            alert('check your email for password reset link');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}



