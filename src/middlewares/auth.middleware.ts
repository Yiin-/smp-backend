import { HttpException, Middleware, NestMiddleware } from 'nest.js';
import * as jwt from 'jsonwebtoken';
import env from '../../env';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor() { }

    resolve() {
        return (req, res, next) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                let token = req.headers.authorization.split(' ')[1];

                jwt.verify(token, env.jwt_secret, function (err, payload) {

                    if (!err) {
                        req.payload = payload;
                        next();
                    }
                    else {
                        return res.status(403).json(err);
                    }
                });
            } else {
                return res.status(401).json({ message: "You must provide a valid authenticated access token." });
            }
        }
    }
}