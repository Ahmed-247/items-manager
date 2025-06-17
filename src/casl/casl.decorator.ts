// src/casl/casl.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Actions, Subjects } from './casl-ability.factory';

export interface RequiredRule {
  action: Actions;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...rules: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, rules);
