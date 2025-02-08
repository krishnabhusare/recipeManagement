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



const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

app.post('/recipe/add-recipe', userAuthentication.authenticate, async (req, res, next) => {
    try {
        const { recipeName, content, procedure } = req.body;
        const recipe = await req.user.createRecipe({ recipeName, content, procedure });
        res.status(201).json({ msg: 'recipe posted', recipe });


    } catch (err) {
        res.status(500).json(err);
    }
})




User.hasMany(Recipe);
Recipe.belongsTo(User);

sequelize.sync({})
    .then(() => {
        app.listen(3000);
    })