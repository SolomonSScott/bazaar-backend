import { Resolver, Mutation, Arg } from 'type-graphql';
import { Recipe } from '../../entity/Recipe';
import { UpdateRecipeInput } from './update/UpdateInput';

@Resolver()
export class UpdateRecipeResolver {
	@Mutation(() => Recipe)
	async updateRecipe(
		@Arg('id') id: number,
		@Arg('RecipeData') recipeData: UpdateRecipeInput,
	): Promise<Recipe | null | boolean> {
		try {
			await Recipe.update( id, recipeData );
			const recipe = Recipe.findOneOrFail( id, {
				relations: ['user', 'recipeToIngredients']
			});

			if ( ! recipe ) {
				return null;
			}

			return recipe;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
