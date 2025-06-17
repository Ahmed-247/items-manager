// src/casl/casl-ability.factory.ts
import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  Ability,
  InferSubjects,
  ExtractSubjectType,
  
} from '@casl/ability';
import { User, Role } from '../user/entities/user.entity';
import { Item } from 'src/item/entities/item.entity';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// 👇 We infer the classes (entities) here
export type Subjects = InferSubjects<typeof User | typeof Item> | 'all';
//type Subjects = 'User' | 'Item' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>
    );

    if (user.role === Role.Admin) {
      can(Actions.Manage, 'all'); // full access
    } else {
      can(Actions.Read, User, { id: user.id });
      can(Actions.Update, User, { id: user.id });
      can(Actions.Delete, User, { id: user.id });

      can(Actions.Create, Item);
      can(Actions.Read, Item);
      can(Actions.Update, Item, { owner: { id: user.id } });
      can(Actions.Delete, Item, { owner: { id: user.id } });
    }

    return build(
        {
  detectSubjectType: (item: any) => item.constructor as ExtractSubjectType<Subjects>,
}

    );
  }
}
