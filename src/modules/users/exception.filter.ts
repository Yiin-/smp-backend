import { Catch, ExceptionFilter, HttpStatus } from 'nest.js';


export class UserNotFoundException { }

@Catch(UserNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception, response) {
        response.status(HttpStatus.NOT_FOUND).json(exception);
    }
}


export class UserValidationFailedException {
    public errors: Object;

    constructor(exception) {
        this.errors = {};

        for (let error in exception.errors) {
            this.errors[error] = exception.errors[error].message;
        }
    }
}

@Catch(UserValidationFailedException)
export class ValidationFailedExceptionFilter implements ExceptionFilter {
    catch(exception, response) {
        response.status(HttpStatus.BAD_REQUEST).json(exception.errors);
    }
}