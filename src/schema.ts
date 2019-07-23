import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';
import { CreateRecipeResolver } from './modules/recipe/Create';
import { RecipesResolver } from './modules/recipe/Recipes';
import { DeleteRecipesResolver } from './modules/recipe/Delete';
import { IngredientResolver } from './modules/ingredient/Ingredient';

const resolvers = [
	RegisterResolver,
	LoginResolver,
	MeResolver,
	CreateRecipeResolver,
	RecipesResolver,
	DeleteRecipesResolver,
	IngredientResolver
];

export default resolvers;
