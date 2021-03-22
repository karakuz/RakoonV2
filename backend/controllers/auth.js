const User = require('./../models/user');

exports.signUp = (req, res, next) => {

    const newUser = User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
}