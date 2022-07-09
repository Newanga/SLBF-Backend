const jwt = require('jsonwebtoken')


function generateAccessToken(user) {
     return jwt.sign({...user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100 days' })
}

function getUserIDFromAccessToken(req) {
    const authHeader = req.headers['access_token']
    const token = authHeader && authHeader.split(' ')[1]
    const { userID } = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    return userID;
}




module.exports = {
    generateAccessToken,
    getUserIDFromAccessToken
};



  