import * as jwt from 'jsonwebtoken';
import env from '../../../env';

export class AuthHelper {
    genToken(user) {
        const token = {
            token: jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role,
                exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
            }, env.jwt_secret)
        };

        return token;
    }
}