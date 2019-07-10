import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	first_name: string

	@Field()
	@Column()
	last_name: string

	@Field()
	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Field(() => [Recipe], { nullable: true })
	@OneToMany(() => Recipe, recipe => recipe.user)
	recipes: Recipe[];
}