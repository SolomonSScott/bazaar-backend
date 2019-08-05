import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { Recipe } from '../../entity/Recipe';
import { RecipeToIngredient } from '../../entity/RecipeToIngredient';
import { CreateRecipeInput } from './create/CreateInput';
import { AppContext } from "../../types/AppContext";
import { IngredientInput, Ingredient } from "../../entity/Ingredient";

@Resolver()
export class CreateRecipeResolver {
	@Mutation(() => Recipe)
	async createRecipe(@Arg('recipeInfo') {
		title,
		description,
		featured_image,
		instructions,
		cooking_time,
		category
	}: CreateRecipeInput,
	@Arg('ingredients', () => [IngredientInput]) ingredients_list: IngredientInput[],
	@Ctx() ctx: AppContext
	): Promise<Recipe | null> {
		if ( ! ctx.user ) {
			return null;
		}

		const recipe_ingredients = await Promise.all(ingredients_list.map(async function( item ) {
			// Map current ingredient to the quantity and measurement.
			const ingredient = await Ingredient.findOne({ where: { name: item.name }});
			if ( ! ingredient ) {
				const ingredient = await Ingredient.create({
					name: item.name
				}).save();
				return await RecipeToIngredient.create({
					quantity: item.quantity,
					measurement: item.measurement,
					ingredient
				});
			}
			return await RecipeToIngredient.create({
				quantity: item.quantity,
				measurement: item.measurement,
				ingredient
			});
		}));

		const recipeRepo = ctx.connection.getRepository(Recipe);

		const recipe = await Recipe.create({
			title,
			description,
			featured_image,
			instructions,
			cooking_time,
			category,
			user: ctx.user
		});

		recipe.recipeToIngredients = Promise.resolve(recipe_ingredients);
		
		await recipeRepo.save(recipe);

		return recipe;
	}
}