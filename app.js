require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/user');
const router = require('./routes/user');
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const ForgotPassword = require('./models/forgotpassword');
const passwordRoutes = require('./routes/password');
const userAuthentication = require('./middelware/auth');
const profileRoutes = require('./routes/profile');
const multer = require('multer');
const AWS = require('aws-sdk');
const Recipe = require('./models/recipe');
const recipeRoutes = require('./routes/recipe');
const { Op } = require('sequelize');
const searchRoutes = require('./routes/search');
const Collection = require('./models/collection');
const favoriteRoutes = require('./routes/favorite');
const Rating = require('./models/rating');
const Comment = require('./models/comments');
const ratingRoutes = require('./routes/rating');
const commentRoutes = require('./routes/comment');
const Follow = require('./models/follow');
const followRoutes = require('./routes/follow');
const Activity = require('./models/activity');
const activityRoutes = require('./routes/activity');
const adminRoutes = require('./routes/admin');
const path = require('path');





const app = express();
app.use(cors());
app.use(express.json());


app.use('/user', userRoutes);
app.use('/password', passwordRoutes);
app.use('/profile', profileRoutes);
app.use('/recipe', recipeRoutes);
app.use('/search', searchRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/rating', ratingRoutes)
app.use('/comment', commentRoutes);
app.use('/follow', followRoutes);
app.use('/activity', activityRoutes);
app.use('/admin', adminRoutes);



app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, `public/${req.url}`));
})




User.hasMany(ForgotPassword, { onDelete: "CASCADE" });
ForgotPassword.belongsTo(User);

User.hasMany(Recipe, { onDelete: "CASCADE" });
Recipe.belongsTo(User);

User.belongsToMany(Recipe, { through: 'favoriteRecipe', onDelete: "CASCADE" });
Recipe.belongsToMany(User, { through: 'favoriteRecipe', onDelete: "CASCADE" })

User.hasMany(Collection, { onDelete: "CASCADE" });
Collection.belongsTo(User);

Collection.belongsToMany(Recipe, { through: 'CollectionRecipe' });
Recipe.belongsToMany(Collection, { through: 'CollectionRecipe' });

User.hasMany(Rating, { onDelete: "CASCADE" });
Rating.belongsTo(User);

Recipe.hasMany(Rating);
Rating.belongsTo(Recipe);

User.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(User);

Recipe.hasMany(Comment);
Comment.belongsTo(Recipe);

User.belongsToMany(User, { through: Follow, as: "Following", foreignKey: "followerId", onDelete: "CASCADE" },);
User.belongsToMany(User, { through: Follow, as: "Followers", foreignKey: "followingId", onDelete: "CASCADE" });

User.hasMany(Activity, { onDelete: "CASCADE" });
Activity.belongsTo(User);






sequelize.sync({})
    .then(() => {
        app.listen(3000);
    })