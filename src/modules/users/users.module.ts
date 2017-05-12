import { Module } from 'nest.js';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { NestModule, MiddlewaresConsumer } from 'nest.js/common/index';

@Module({
    controllers: [UsersController],
    components: [
        { provide: 'UsersService', useClass: UsersService }
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UsersController);
    }
}
