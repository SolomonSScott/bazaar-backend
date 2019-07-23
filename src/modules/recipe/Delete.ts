import { Resolver, Query } from "type-graphql";
import { Recipe } from "../../entity/Recipe";
import { getRepository } from "typeorm";
import { Ingredient } from "../../entity/Ingredient";

@Resolver()
export class DeleteRecipesResolver {
	@Query(() => String)
	async deleteAll(): Promise<string> {
		const recipesRepo = getRepository(Recipe);
		const ingredientRepo = getRepository(Ingredient);
		
		await ingredientRepo.delete({});
		await recipesRepo.delete({});
		return 'all recipes have been deleted';
	}
}