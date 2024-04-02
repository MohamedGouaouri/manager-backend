import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../roles';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      user: User;
    } & {
      headers: Request['headers'] & { contextHandler: ExecutionContext };
    };

    if (!request.headers['authorization']) throw new UnauthorizedException();
    const token = request.headers['authorization'].split(' ')[1];
    const decoded = this.jwtService.decode(token);
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!decoded.role || !roles.includes(decoded.role))
      throw new UnauthorizedException();
    request.user = {
      id: decoded.id,
      role: decoded.role,
    };
    return true;
  }
}
