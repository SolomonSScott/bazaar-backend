import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, InputType, Ctx, ID } from 'type-graphql';
import { Recipe } from './Recipe';
import { RecipeToIngredient } from './RecipeToIngredient';
import { AppContext } from '../types/AppContext';

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string

	@Field(() => [Recipe], { nullable: true })
	async recipes(@Ctx() { recipeLoader }: AppContext): Promise<Recipe[]> {
		return recipeLoader.load(this.id);
	}

	@Field(() => [RecipeToIngredient], { nullable: true })
	@OneToMany(() => RecipeToIngredient, (recipeToIngredients) => recipeToIngredients.ingredient, {
		lazy: true,
		cascade: true
	})
	recipeToIngredients: Promise<RecipeToIngredient[]>;
}

@InputType('IngredientInput')
export class IngredientInput {
	@Field()
	name: string

	@Field()
	quantity: number

	@Field()
	measurement: string
}