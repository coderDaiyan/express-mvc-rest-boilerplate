// const admin = require('../config/firebase');

module.exports = () => {
    return async (req, res, next) => {
        try {
            let [bearer, idToken] = req.headers.authorization.split(" ");
            if (bearer && bearer.startsWith("Bearer") && idToken) {
                let firebaseUser = await admin.auth().verifyIdToken(idToken);
                req.user = firebaseUser;
                next();
            } else {
                let error = new Error("Invalid or expired token found. please refresh your browser & login again");
                error.status = 401;
                next(error)
            }

        } catch (error) {
            res.status(401).json({
                error: error.message
            })
        }
    }
}