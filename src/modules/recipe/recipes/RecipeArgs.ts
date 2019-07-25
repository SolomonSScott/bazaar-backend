import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class RecipeArgs {
	@Field({ defaultValue: 0 })
	skip: number;

	@Field({ defaultValue: 10 })
	take: number;
}