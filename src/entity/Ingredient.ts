import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { Recipe } from './Recipe';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string

	@Field(() => [Recipe])
	@ManyToMany(() => Recipe, recipe => recipe.ingredients)
	@JoinTable()
	recipes: Recipe[];
}