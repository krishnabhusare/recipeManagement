require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const Recipe = require('./models/recipe');
const recipeRoutes = require('./routes/recipe');
const Comments = require('./models/comments');
const allRecipeRoutes = require('./routes/allRecipe');
const path = require('path');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/allRecipe', allRecipeRoutes);


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', `${req.url}`))
})





User.hasMany(Recipe);
Recipe.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

Recipe.hasMany(Comments);
Comments.belongsTo(Recipe);



sequelize.sync({})
    .then(() => {
        app.listen(3000);
    })