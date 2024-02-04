import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { NextFunction, Request, Response } from 'express';
  import { validate } from 'class-validator';
<<<<<<< HEAD
import { LoginRequestBody } from '../types/Login-validation-requestBody';
=======
import { LoginValidationRequestBody } from '../types/login-validation-requestBody';
>>>>>>> 752e9d65862bc5cfdc987ff9db4584f7fdbb044a
  
  @Injectable()
  export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
  
<<<<<<< HEAD
      const loginRequestBody = new LoginRequestBody();
=======
      const loginRequestBody = new LoginValidationRequestBody();
>>>>>>> 752e9d65862bc5cfdc987ff9db4584f7fdbb044a
      loginRequestBody.email = body.email;
      loginRequestBody.password = body.password;
  
      const validations = await validate(loginRequestBody);
  
      if (validations.length) {
        throw new BadRequestException(
          validations.reduce((acc, curr) => {
            return [...acc, ...Object.values(curr.constraints)];
          }, []),
        );
      }
  
      next();
    }
  }