const multer = require('multer');
const AWS = require('aws-sdk');
const Recipe = require('../models/recipe');
const Activity = require('../models/activity');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function uploadtos3(data, filename) {
    const BUCKET_NAME = process.env.S3_BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRETE;

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET

    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('somethin went wrong');
                reject(err);
            } else {

                resolve(s3response.Location);
            }
        })
    })
}

const postRecipe = async (req, res, next) => {
    try {


        const { recipename, description, ingredient, method, cuisin, mainingredient, cookingtime, serves, keyword } = req.body;


        const uploadresult = await uploadtos3(req.file.buffer, `image-${req.user.name}/${new Date()}.jpg`);

        const recipe = await req.user.createRecipe({ recipename, description, ingredient, method, cuisin, mainingredient, cookingtime, serves, keyword, imageurl: uploadresult });

        await req.user.createActivity({
            action: 'posted a recipe',
            recipeId: recipe.id,
            entityType: "recipe"

        })
        res.status(201).json({ recipe });

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getMyRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findAll({
            where: { userId: req.user.id },
            attributes: ['recipename', 'id']
        });

        res.status(200).json({ recipe });

    } catch (err) {
        res.status(500).json(err);
    }
}

const getDetailsOfRecipe = async (req, res, next) => {
    try {
        const { recipeid } = req.params;
        const recipeDetails = await Recipe.findByPk(recipeid);
        res.status(200).json({ recipeDetails });


    }
    catch (err) {
        res.status(500).json(err);
    }
}

const deleteRecipe = async (req, res, next) => {
    try {
        const { recipeid } = req.params;
        if (req.user.isAdmin) {
            await Recipe.destroy({ where: { id: recipeid } });
            return res.status(200).json({ msg: "deleted" });
        }
        const recipe = await Recipe.destroy(
            { where: { id: recipeid, userId: req.user.id } }
        )
        res.status(200).json({ msg: "deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const updateRecipe = async (req, res, next) => {
    try {
        const { recipeid } = req.params;
        const { recipename, description, ingredient, method, cuisin, mainingredient, cookingtime, serves, keyword } = req.body;


        let currentRecipe;
        if (req.user.isAdmin) {
            currentRecipe = await Recipe.findOne({
                where: { id: recipeid }
            });
        } else {
            currentRecipe = await Recipe.findOne({
                where: { id: recipeid, userID: req.user.id }
            });
        }
        console.log(currentRecipe);

        const uploadresult = await uploadtos3(req.file.buffer, `image-${req.user.name}/${new Date()}.jpg`);
        const recipe = await currentRecipe.update({ recipename, description, ingredient, method, cuisin, mainingredient, cookingtime, serves, keyword, imageurl: uploadresult });
        res.status(201).json({ recipe });

    }
    catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    postRecipe,
    getMyRecipe,
    getDetailsOfRecipe,
    deleteRecipe,
    updateRecipe
}