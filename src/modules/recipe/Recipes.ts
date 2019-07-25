import { Resolver, Query, Arg, Args } from "type-graphql";
import { getConnection } from "typeorm";
import { Recipe } from "../../entity/Recipe";
import { RecipeArgs } from './recipes/RecipeArgs';

@Resolver()
export class RecipesResolver {
	@Query(() => [Recipe])
	async recipes(
		@Args() {
			skip,
			take
		}: RecipeArgs
	): Promise<Recipe[]> {
		const connection = await getConnection();
		const recipes = await connection.getRepository(Recipe).find({
			relations: ['user', 'ingredients'],
			skip,
			take,
		});

		return recipes;
	}

	@Query(() => Recipe)
	async recipe(
		@Arg('id') id: number
	): Promise<Recipe | undefined> {
		const recipe = await Recipe.findOne( id );

		if ( ! recipe ) {
			return undefined;
		}

		return recipe;
	}
}