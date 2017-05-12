import { Component } from 'nest.js';
import { HttpException } from 'nest.js/core/exceptions/http-exception';
import { UserNotFoundException, UserValidationFailedException } from './exception.filter';
import User from './user.model';
import * as bcrypt from 'bcrypt';

@Component()
export class UsersService {
    public async getUsers() {
        return new Promise((resolve, reject) => {
            User.find({}, (err, users) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(users);
                }
            });
        });
    }

    public async getUser(id: string) {
        return new Promise((resolve, reject) => {
            User.findById(id, (err, user) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
            });
        }).catch(reason => {
            throw new UserNotFoundException;
        });
    }

    public async addUser(user) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 10).then(hash => {
                user.password = hash;

                new User(user).save(err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }).catch(reason => {
            console.log(reason);
            throw new UserValidationFailedException(reason);
        });
    }
}