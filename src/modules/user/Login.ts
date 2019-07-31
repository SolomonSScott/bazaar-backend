import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { Login } from '../../types/Login';

@Resolver()
export class LoginResolver {
	@Mutation(() => Login)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
	): Promise<Login | null> {
		const user = await User.findOne( { where: { email } } );

		if ( ! user ) {
			return null;
		}

		const valid = await bcrypt.compare( password, user.password );

		if ( ! valid ) {
			return null;
		}

		const token = jwt.sign( { userID: user.id }, process.env.APP_SECRET!, { expiresIn: '30d' } );

		const data = plainToClass( Login, {
			token,
			user
		} );

		return data;
	}
}
