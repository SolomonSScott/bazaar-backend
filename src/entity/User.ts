import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string

	@Column()
	last_name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@OneToMany(() => Recipe, recipe => recipe.user)
	recipes: Recipe[];
}