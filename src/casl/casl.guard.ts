// src/casl/casl.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from './casl.decorator';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AppAbility } from './casl-ability.factory';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const rules = this.reflector.get<RequiredRule[]>(
      CHECK_ABILITY,
      context.getHandler(),
    );

    if (!rules) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    const ability = this.caslAbilityFactory.createForUser(user);
     for (const rule of rules) {
    console.log('CheckAbilities rule:', rule);
    console.log('Ability.can result:', ability.can(rule.action, rule.subject));
  }

    const hasAccess = rules.every((rule) =>
      ability.can(rule.action, rule.subject),
    );
console.log('User ability rules:', ability.rules);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied by CASL');
    }

    return true;
  }
}
