import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //check if token is valid
    const secret = process.env.JWT_SECRET;

    try {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
      const token = req.headers.authorization.split('Bearer ')[1];
      const decoded = this.jwtService.verify(token, { secret: secret });
    } catch (err) {
      return false;
    }
    return true;
  }
}
