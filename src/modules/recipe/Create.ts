import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import jwt from 'jsonwebtoken';
import { Recipe } from "../../entity/Recipe";
import { User } from "../../entity/User";
import { CreateRecipeInput } from "./create/CreateInput";
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
	}: CreateRecipeInput,
	@Arg('ingredients', () => [IngredientInput]) ingredients_list: Ingredient[],
	@Ctx() ctx: AppContext
	): Promise<Recipe | null> {
		const token: any = await jwt.verify( ctx.req.session!.token, process.env.APP_SECRET! );

		if ( !token ) {
			return null;
		}

		const user = await User.findOne( token.userID );

		if ( ! user ) {
			return null;
		}

		const ingredients = ingredients_list.map(async function(item) {
			const ingredient = await Ingredient.findOne({ where: { name: item.name }});
			if ( ! ingredient ) {
				const ingredient = new Ingredient;
				ingredient.name = item.name;
				await ctx.connection.manager.save(ingredient);
				return ingredient;
			}
			return ingredient;
		});

		const recipeRepo = ctx.connection.getRepository(Recipe);

		const recipe = new Recipe();
		recipe.title = title;
		recipe.description = description;
		recipe.featured_image = featured_image;
		recipe.instructions = instructions;
		recipe.user = user;
		recipe.ingredients = ingredients;

		await recipeRepo.save(recipe);

		return recipe;
	}
}