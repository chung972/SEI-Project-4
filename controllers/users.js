const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup,
    login
};

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.json({ token });
        // return a full JWT; recall that JWTs are structured like: header.payload.signature
    } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ err: 'bad credentials' });
        user.comparePassword(req.body.pw, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user);
                res.json({ token });
            } else {
                return res.status(401).json({ err: 'bad credentials' });
            }
        });
    } catch (err) {
        return res.status(401).json(err);
    }
}

/*----- Helper Functions -----*/

function createJWT(user) {
    // note that this 'user' being passed in will be an instance of the user MODEL; meaning that
    // this object will have all the keys specified in the userSchema
    return jwt.sign(
        { user }, // data payload
        SECRET,
        { expiresIn: '24h' }
    );
}