
import jwt from 'jsonwebtoken';
export function verifyToken(req, res, next) {
    const accessToken  = req.headers['authorization'];
    if (!accessToken ) {
        return res.status(401).send('Access denied');
    }
    const token = accessToken .split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid Token');
        }
        req.user = user; 
        next();
    });
}
