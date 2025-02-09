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



const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);


app.get('/allRecipe/get-allRecipe', async (req, res, next) => {
    try {
        const allRecipe = await Recipe.findAll();
        res.status(200).json({ allRecipe });

    } catch (err) {
        res.status(500).json(err);
    }
})

app.post('/allRecipe/add-comment', userAuthentication.authenticate, async (req, res, next) => {
    try {
        const { comment, recipeid } = req.body;

        const comments = await req.user.createComment({ comment, recipeId: recipeid })
        res.status(201).json({ comments });

    }
    catch (err) {
        res.status(500).json(err);
    }
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