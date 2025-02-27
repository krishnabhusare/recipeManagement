const ForgotPassword = require('../models/forgotpassword');
const bcrypt = require('bcrypt');
const Sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const User = require('../models/user');

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });


        if (user) {
            const id = uuid.v4();
            await ForgotPassword.create({ id, active: true, userId: user.id });
            Sib.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_API_KEY;

            const apiInstance = new Sib.TransactionalEmailsApi();
            const sendSmtpEmail = new Sib.SendSmtpEmail();

            sendSmtpEmail.sender = { email: 'krishnabhusare1996@gmail.com', name: 'krishna' };
            sendSmtpEmail.to = [{ email: email, name: 'kanha' }];
            sendSmtpEmail.subject = 'forgot password link';
            sendSmtpEmail.textContent = 'this is mail from krishna for reseting your password';
            sendSmtpEmail.htmlContent = `<a href="http://13.234.231.9:3000/password/reset-password/${id}">Forgot password</a>`



            await apiInstance.sendTransacEmail(sendSmtpEmail).then(response => {

                return res.status(200).json({ msg: 'link sent on your mail' });
            })

        } else {
            res.status(404).json({ msg: 'user not found' });
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { passwordid } = req.params;
        const idCheck = await ForgotPassword.findOne({ where: { id: passwordid } });
        if (idCheck) {
            await idCheck.update({ active: false });
            res.status(200).send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="http://13.234.231.9:3000/password/update-password/${passwordid}">
        <label for="newPassword">New Password:</label>
        <input type="password" name="password" id="password">
        <button>set password</button>
    </form>
</body>

</html>`)

        }

        res.end();


    }
    catch (err) {
        res.status(500).json(err);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const { passwordid } = req.params;
        const { password } = req.query;

        const hashedPassword = await bcrypt.hash(password, 10);

        const passwordRow = await ForgotPassword.findOne({ where: { id: passwordid } });

        const user = await User.findOne({ where: { id: passwordRow.userId } });

        await user.update({ password: hashedPassword });
        res.status(200).json({ msg: 'password updated successfully' });

    }
    catch (err) {
        res.status(500).json(err);
    }
}



module.exports = {
    forgotPassword,
    resetPassword,
    updatePassword


}