import { Field, InputType } from "type-graphql";

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
}