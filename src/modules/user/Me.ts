import { Resolver, Query, Ctx } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { AppContext } from '../../types/AppContext';

@Resolver()
export class MeResolver {
	@Query(() => User, { nullable: true })
	async me(
		@Ctx() ctx: AppContext
	): Promise<User | undefined> {
		if (!ctx.req.session!.token) {
			return undefined;
		}

		const token: any = jwt.verify( ctx.req.session!.token, process.env.APP_SECRET! );

		const user = await User.findOne( token.userID );

		return user;
	}
}