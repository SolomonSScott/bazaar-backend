import { Resolver, Query } from "type-graphql";
import { getConnection } from "typeorm";
import { Recipe } from "../../entity/Recipe";

@Resolver()
export class RecipesResolver {
	@Query(() => [Recipe])
	async recipes(): Promise<Recipe[]> {
		const connection = await getConnection();
		const recipes = await connection.getRepository(Recipe).find({ relations: ['user', 'ingredients'] });

		console.log(recipes);
		return recipes;
	}
}