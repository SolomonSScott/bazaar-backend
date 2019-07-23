import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, Column } from 'typeorm';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Recipe } from './Recipe';

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string

	@Field(() => [Recipe], { nullable: true })
	@ManyToMany(() => Recipe, recipe => recipe.ingredients)
	recipes: Recipe[];
}

@InputType('IngredientInput')
export class IngredientInput {
	@Field()
	name: string
}