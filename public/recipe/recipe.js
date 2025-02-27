function recipe(e) {
    e.preventDefault();
    const recipename = e.target.recipename.value;
    const description = e.target.description.value;
    const ingredient = e.target.ingredient.value;
    const method = e.target.method.value;
    const cuisin = e.target.cuisin.value;
    const mainingredient = e.target.mainingredient.value;
    const cookingtime = e.target.cookingtime.value;
    const serves = e.target.serves.value;
    const keyword = e.target.keyword.value;



    const uploadphoto = e.target.uploadphoto.files[0];

    const formData = new FormData();
    formData.append("recipename", recipename);
    formData.append("image", uploadphoto);
    formData.append('description', description);
    formData.append('ingredient', ingredient);
    formData.append('method', method);
    formData.append('cuisin', cuisin);
    formData.append('mainingredient', mainingredient);
    formData.append('cookingtime', cookingtime);
    formData.append('serves', serves);
    formData.append('keyword', keyword);






    const token = localStorage.getItem('token');


    axios.post('http://13.234.231.9:3000/recipe/post-recipe', formData, { headers: { Authorization: token } })
        .then(result => {
            alert('recipe posted');
            window.location.href = '../myrecipe/myrecipe.html';
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}


