const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    let token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, "sandesh");
    return token;
}

module.exports = generateToken