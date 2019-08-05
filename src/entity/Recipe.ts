import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Category } from '../types/Category';
import { RecipeToIngredient } from './RecipeToIngredient';

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

	@Field()
	@Column()
	cooking_time: number

	@Field(() => Category)
	@Column()
	category: Category

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, user => user.recipes, {
		eager: true
	})
	user: User;

	@Field(() => [RecipeToIngredient], { nullable: true })
	@OneToMany(() => RecipeToIngredient, (recipeToIngredients) => recipeToIngredients.recipe, {
		eager: true,
		lazy: true,
		cascade: true
	})
	recipeToIngredients: Promise<RecipeToIngredient[]>;
}
