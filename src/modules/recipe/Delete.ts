import { Resolver, Query } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Recipe } from '../../entity/Recipe';
import { Ingredient } from '../../entity/Ingredient';
import { RecipeToIngredient } from '../../entity/RecipeToIngredient';

@Resolver()
export class DeleteRecipesResolver {
	@Query(() => String)
	async deleteAll(): Promise<string> {
		const recipesRepo = getRepository(Recipe);
		const ingredientRepo = getRepository(Ingredient);
		const r2IRepo = getRepository(RecipeToIngredient);
		
		
		await r2IRepo.delete({});
		await ingredientRepo.delete({});
		await recipesRepo.delete({});
		return 'all recipes have been deleted';
	}
}