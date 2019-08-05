import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity, JoinColumn, PrimaryColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class RecipeToIngredient extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryColumn()
	recipeId: number;

	@PrimaryColumn()
	ingredientId: number;

	@Field()
	@Column()
	quantity: number

	@Field()
	@Column()
	measurement: string

	@Field(() => Recipe, {nullable: true})
	@ManyToOne(() => Recipe, recipe => recipe.recipeToIngredients, { primary: true })
	@JoinColumn({name: 'recipeId'})
	recipe: Recipe

	@Field(() => Ingredient, {nullable: true})
	@ManyToOne(() => Ingredient, ingredient => ingredient.recipeToIngredients, {
		primary: true,
		eager: true,
		lazy: true
	})
	@JoinColumn({name: 'ingredientId'})
	ingredient: Ingredient
}