import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const accessToken = req.headers['authorization'];

    console.log(accessToken);

    if (!accessToken) {
        return res.send('Access denied');
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.send('Invalid Token');
        } else {
            next();
        }
    })
}