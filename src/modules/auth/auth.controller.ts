import { Controller, Dependencies, Get, Post, Request, Response, Body, HttpStatus } from 'nest.js';
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Controller('auth')
@Dependencies([AuthService, UsersService])

export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @Post('/login')
    public async login( @Response() res, @Body('email') email, @Body('password') password) {
        const auth = await this.authService.login(email, password);
        res.status(HttpStatus.OK).json(auth);
    }

    @Get('/test')
    public async test( @Response() res) {
        await this.usersService.addUser({
            email: 'asd',
            password: 'asd',
            role: 'admin'
        });
        res.status(HttpStatus.OK).json({ success: true });
    }
}