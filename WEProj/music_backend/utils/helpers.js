const jwt = require("jsonwebtoken");

exports ={}

exports.getToken = async (email, user) => {
    const token = jwt.sign({indentifier: user.id }, "bigSecret");
    return token;

};

module.exports = exports;