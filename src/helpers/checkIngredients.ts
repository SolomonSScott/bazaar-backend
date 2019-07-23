import { getConnection } from "typeorm";
import { Ingredient } from "../entity/Ingredient";

function checkIfExists(value: string): Boolean {
	const result = getConnection()
		.getRepository(Ingredient)
		.createQueryBuilder('ingredient')
		.where('ingredient.name= :value', { value: value })
		.getOne();
	return result !== undefined;
}

export default checkIfExists;
