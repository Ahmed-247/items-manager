import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, status?: any) {
        if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Your token has expired. Please log in again.');
      }

      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token. Please log in again.');
      }

      throw new UnauthorizedException('You must log in to access this resource.');
    }

    return user;
    }
}