import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { AppContext } from '../../types/AppContext';

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: AppContext
	): Promise<User | null> {
		const user = await User.findOne( { where: { email } } );

		if ( ! user ) {
			return null;
		}

		const valid = await bcrypt.compare( password, user.password );

		if ( ! valid ) {
			return null;
		}

		ctx.req.cookies.token = jwt.sign( { userID: user.id }, process.env.APP_SECRET! );

		return user;
	}
}
