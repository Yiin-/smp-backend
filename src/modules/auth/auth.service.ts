import { Component, HttpException } from 'nest.js';
import { AuthHelper } from './auth.helper';
import User from '../users/user.model';
import * as bcrypt from 'bcrypt';

@Component()
export class AuthService {

    constructor(
        private authHelper: AuthHelper
    ) { }

    public async login(email, password) {

        if (!email) {
            return new HttpException("Email is required", 422);
        }
        if (!password) {
            return new HttpException("Password is required", 422);
        }

        return new Promise((resolve, reject) => {
            User.findOne({ email }, (err, user) => {
                if (err) {
                    reject(new HttpException(err, 503))
                }
                else if (!user) {
                    reject(new HttpException("User does not exist.", 401));
                }
                else {
                    bcrypt.compare(password, user.password, (err, correct) => {
                        if (correct) {
                            resolve(this.authHelper.genToken(user));
                        }
                        else {
                            reject(new HttpException(`Incorrect password.`, 401));
                        }
                    });
                }
            });
        });
    }

}