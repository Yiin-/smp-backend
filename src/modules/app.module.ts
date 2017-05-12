import { Module } from 'nest.js';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    modules: [UsersModule, AuthModule],
    controllers: [],
})
export class ApplicationModule { }