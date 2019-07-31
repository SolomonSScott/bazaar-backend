import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { AppContext } from '../../types/AppContext';

@Resolver()
export class MeResolver {
	@Query(() => User, { nullable: true })
	async me(
		@Ctx() ctx: AppContext
	): Promise<User | undefined> {
		if ( ! ctx.user ) {
			return undefined;
		}

		return ctx.user;
	}
}