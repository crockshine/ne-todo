import {createParamDecorator, ExecutionContext, NotFoundException} from "@nestjs/common";
import {User as TUser} from "@prisma/client";

export const User = createParamDecorator(
  (data: keyof TUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: TUser | undefined = request.user;
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return data ? user[data] : user
  }
)