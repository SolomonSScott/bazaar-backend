import { Field, InputType } from 'type-graphql';
import { Category } from '../../../types/Category';

@InputType()
export class UpdateRecipeInput {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	featured_image: string;

	@Field({ nullable: true })
	instructions: string;

	@Field({ nullable: true })
	cooking_time: number

	@Field(() => Category, { nullable: true })
	category: Category
}