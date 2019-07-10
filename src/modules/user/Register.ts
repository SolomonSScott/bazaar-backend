import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';

@Resolver()
export class RegisterResolver {
	@Mutation(() => User)
	async register(
		@Arg('first_name') first_name: string,
		@Arg('last_name') last_name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);
		const email_loc = email.toLowerCase();

		const user = await User.create({
			first_name,
			last_name,
			email: email_loc,
			password: hashedPassword
		}).save();

		return user;
	}
}