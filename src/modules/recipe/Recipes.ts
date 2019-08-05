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
			take,
			category,
			user_id
		}: RecipeArgs
	): Promise<Recipe[]> {
		const where: any = [];
		if ( category ) {
			where.push({ category });
		}

		if ( user_id ) {
			where.push({ user: user_id });
		}

		const connection = await getConnection();
		const recipes = await connection.getRepository(Recipe).find({
			relations: ['user', 'recipeToIngredients', 'recipeToIngredients.ingredient'],
			where,
			skip,
			take,
		});

		return recipes;
	}

	@Query(() => Recipe)
	async recipe(
		@Arg('id') id: number
	): Promise<Recipe | undefined> {
		const connection = await getConnection();
		const recipe = await connection.getRepository(Recipe).findOne( id, {
			relations: ['user', 'recipeToIngredients']
		});

		if ( ! recipe ) {
			return undefined;
		}

		return recipe;
	}
}