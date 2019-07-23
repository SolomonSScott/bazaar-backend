import { Resolver, Query } from "type-graphql";
import { getConnection } from "typeorm";
import { Ingredient } from "../../entity/Ingredient";

@Resolver()
export class IngredientResolver {
	@Query(() => [Ingredient])
	async ingredients(): Promise<Ingredient[]> {
		const connection = await getConnection();
		const ingredients = await connection.getRepository(Ingredient).find({ relations: ['recipes'] });

		return ingredients;
	}
}
