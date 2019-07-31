import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { Login } from '../../types/Login';

@Resolver()
export class RegisterResolver {
	@Mutation(() => Login)
	async register(
		@Arg('first_name') first_name: string,
		@Arg('last_name') last_name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<Login> {
		const hashedPassword = await bcrypt.hash(password, 12);
		const email_loc = email.toLowerCase();

		const user = await User.create({
			first_name,
			last_name,
			email: email_loc,
			password: hashedPassword
		}).save();

		const token = await jwt.sign( { userID: user.id }, process.env.APP_SECRET!, { expiresIn: '30d' } );

		const data = await plainToClass( Login, {
			token,
			user
		} );

		return data;
	}
}