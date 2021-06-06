import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { encript, addSalt } from '../utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    let userPassword = req.body['password'];
    if(userPassword){
      const salt = addSalt();
      userPassword = encript(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    next();
  }
}
