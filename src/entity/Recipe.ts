import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Ingredient } from './Ingredient';

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

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, user => user.recipes, {
		eager: true
	})
	user: User;

	@Field(() => [Ingredient], { nullable: true })
	@ManyToMany(() => Ingredient, ingredient => ingredient.recipes, {
		eager: true,
		lazy: true,
		cascade: true
	})
	@JoinTable()
	ingredients: Promise<Ingredient[]>;
}
