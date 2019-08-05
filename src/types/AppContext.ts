import { Request, Response } from 'express';
import { Connection } from 'typeorm'
import { User } from '../entity/User';
import { createRecipeLoader } from '../helpers/recipeLoader';

export interface AppContext {
	req: Request,
	res: Response,
	connection: Connection,
	user: User,
	recipeLoader: ReturnType<typeof createRecipeLoader>
}