import { Resolver, Query, Arg } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Ingredient } from '../../entity/Ingredient';

@Resolver()
export class IngredientResolver {
	@Query(() => [Ingredient])
	async ingredients(): Promise<Ingredient[]> {
		const connection = await getConnection();
		const ingredients = await connection.getRepository(Ingredient).find();


		return ingredients;
	}

	@Query(() => Ingredient)
	async ingredient(
		@Arg('id') id: number
	): Promise<Ingredient | undefined> {
		const connection = await getConnection();
		const ingredient = await connection.getRepository(Ingredient).findOne( id );

		if ( ! ingredient ) {
			return undefined;
		}

		return ingredient;
	}
}
