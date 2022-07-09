const jwt = require('jsonwebtoken')

const checkRole = roles => {
    return (req, res, next) => {
        const authHeader = req.headers['access_token']
        const token = authHeader && authHeader.split(' ')[1]
        const { role } = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)

        const isAuthorized = () => {
            let authority = false;
            for (authRole in roles) {
                if ( role === roles[authRole]) {
                    authority = true;
                    break;
                }
                else {
                    authority = false;
                }
            }
            return authority;
        }
        
        if (isAuthorized()) {
            next()
        }
        else {
            res.status(401).send({ result: 'error', message: `No ${role} permission granted` })
        }
    }

}
module.exports = {
    checkRole
};