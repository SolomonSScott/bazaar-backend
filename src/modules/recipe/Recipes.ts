import { Resolver, Query, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { Recipe } from "../../entity/Recipe";

@Resolver()
export class RecipesResolver {
	@Query(() => [Recipe])
	async recipes(): Promise<Recipe[]> {
		const connection = await getConnection();
		const recipes = await connection.getRepository(Recipe).find({ relations: ['user', 'ingredients'] });

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