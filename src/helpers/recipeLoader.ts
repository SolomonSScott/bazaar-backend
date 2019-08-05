import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { RecipeToIngredient } from '../entity/RecipeToIngredient';
import { Recipe } from '../entity/Recipe';

const batchRecipes = async (ingredientIDs: number[]) => {
	const ingredientRecipes = await RecipeToIngredient.find({
		join: {
			alias: 'recipeToingredient',
			innerJoinAndSelect: {
				recipe: 'recipeToingredient.recipe'
			}
		},
		where: {
			ingredientId: In(ingredientIDs)
		}
	});

	const ingredientIDToRecipe: { [key: number]: Recipe[] } = {};

	ingredientRecipes.forEach(r2i => {
		if (r2i.ingredientId in ingredientIDToRecipe) {
			ingredientIDToRecipe[r2i.ingredientId].push((r2i as any).recipe);
		} else {
			ingredientIDToRecipe[r2i.ingredientId] = [(r2i as any).recipe];
		}
	});
	
	return ingredientIDs.map(ingredientId => ingredientIDToRecipe[ingredientId]);
}

export const createRecipeLoader = () => new DataLoader(batchRecipes);
