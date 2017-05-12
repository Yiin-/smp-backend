import { Module } from 'nest.js';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth.helper';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [AuthController],
    components: [AuthService, AuthHelper],
    modules: [UsersModule]
})

export class AuthModule { }