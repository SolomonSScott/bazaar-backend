import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Ingredient } from './Ingredient';

@Entity()
export class Recipe extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string

	@Column()
	description: string

	@Column()
	featured_image: string

	@Column()
	instructions: string

	@ManyToOne(() => User, user => user.recipes)
	user: User;

	@ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
	@JoinTable()
	ingredients: Ingredient[];
}
