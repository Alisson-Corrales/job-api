const jwt = require("jsonwebtoken");
const {UnauthError} = require('../errors')


const authenticationMiddleware = (req, res, next) => {
    const authentHeader = req.header.authorization;

    // if there's no authentication header or it starts with Bearer and nothing else, it'll show a error
    if(!authentHeader || !authentHeader.startsWith("Bearer ")) {
        throw new UnauthError("No token provided >:O")
    }

    const token = authentHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_secret)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (err) {
        throw new UnauthError('Not authorized to access this route!')
    }
}

module.exports = authenticationMiddleware