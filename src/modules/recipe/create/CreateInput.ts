import { Field, InputType } from 'type-graphql';
import { Category } from '../../../types/Category';

@InputType()
export class CreateRecipeInput {
	@Field()
	title: string;

	@Field()
	description: string;

	@Field()
	featured_image: string;

	@Field()
	instructions: string;

	@Field()
	cooking_time: number

	@Field(() => Category)
	category: Category
}