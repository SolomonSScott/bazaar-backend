import { InterfaceType, Field } from 'type-graphql';
import { User } from '../entity/User';

@InterfaceType({
	resolveType: value => {
		if ( 'token' in value ) {
			return 'LoginPayload';
		}

		return 'LoginPayload';
	}
})
export abstract class Payload {
	@Field(() => User)
	user: User
}