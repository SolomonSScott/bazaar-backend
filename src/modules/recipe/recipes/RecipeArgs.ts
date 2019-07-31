import { ArgsType, Field } from 'type-graphql';
import { Category } from '../../../types/Category';

@ArgsType()
export class RecipeArgs {
	@Field({ defaultValue: 0, nullable: true })
	skip: number;

	@Field({ defaultValue: 10, nullable: true })
	take: number;

	@Field(() => Category, { nullable: true })
	category: Category

	@Field({ nullable: true })
	user_id: number
}