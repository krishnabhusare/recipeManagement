require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/user');
const userAuthentication = require('./middelware/auth');
const Recipe = require('./models/recipe');
const recipeRoutes = require('./routes/recipe');
const Comments = require('./models/comments');
const allRecipeRoutes = require('./routes/allRecipe');
const router = require('./routes/user');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/allRecipe', allRecipeRoutes);





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