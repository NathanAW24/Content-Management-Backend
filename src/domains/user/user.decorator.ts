import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: GqlExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().user,
);
