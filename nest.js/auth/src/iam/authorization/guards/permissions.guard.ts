import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorators';
import { PermissionType } from '../permission.type';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!contextPermissions) {
      return true;
    }
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return contextPermissions.every((permission) =>
      //@ts-expect-error replace role with permission
      user.permissions?.includes(permission),
    );
  }
}

// -----
// 📝 ADDITIONS - user.entity.ts - add permissions prop
// NOTE: Having the "permissions" column in combination with the "role"
// likely does not make sense. We use both in this course just to showcase
// two different approaches to authorization.

// @Column({ enum: Permission, default: [], type: 'json' })
// permissions: PermissionType[];

// 📝 ADDITIONS - active-user.data.ts - add permissions prop
/**
 * The subject's (user) permissions.
 * NOTE: Using this approach in combination with the "role-based" approach
 * does not make sense. We have those two properties here ("role" and "permissions")
 * just to showcase two alternative approaches.
 */
// permissions: PermissionType[];
