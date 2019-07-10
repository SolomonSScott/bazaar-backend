import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Ingredient } from './Ingredient';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string

	@Field({ nullable: true })
	@Column()
	description: string

	@Field({ nullable: true })
	@Column()
	featured_image: string

	@Field()
	@Column()
	instructions: string

	@Field(() => User)
	@ManyToOne(() => User, user => user.recipes)
	user: User;

	@Field(() => [Ingredient])
	@ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
	@JoinTable()
	ingredients: Ingredient[];
}
