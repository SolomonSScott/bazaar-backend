import { Request, Response } from 'express';
import { Connection } from 'typeorm'
import { User } from '../entity/User';

export interface AppContext {
	req: Request,
	res: Response,
	connection: Connection,
	user: User
}