import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Ingredient extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string

	@ManyToMany(() => Recipe, recipe => recipe.ingredients)
	@JoinTable()
	recipes: Recipe[];
}