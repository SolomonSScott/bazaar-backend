import { registerEnumType } from 'type-graphql';

export enum Category {
	Breakfast,
	Lunch,
	Dinner,
	Dessert,
	Snack,
	Drinks
}

registerEnumType( Category, {
	name: 'Category',
} );
