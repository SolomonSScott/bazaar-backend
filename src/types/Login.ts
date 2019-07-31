import { ObjectType, Field } from 'type-graphql';
import { User } from '../entity/User';
import { Payload } from './Payload';

@ObjectType({ implements: Payload })
export class Login {
	@Field()
	token: string

	@Field(() => User)
	user: User
}