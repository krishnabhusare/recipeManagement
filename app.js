require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('../../backend/util/database');
const path = require('path');

const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');
const deleteRoutes = require('./routes/delete');
const recipeRoutes = require('./routes/recipe');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);

app.use('/login', loginRoutes);

app.use('/users', userRoutes);

app.use('/delete', deleteRoutes,)

app.use('/recipe', recipeRoutes);


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, `view/${req.url}`))
})


async function dummy() {
    try {

        await sequelize.sync();
        app.listen(5000);

    } catch (err) {
        console.log(err);
    }
}

dummy();