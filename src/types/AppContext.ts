import { Request } from 'express';
import { Connection } from 'typeorm'

export interface AppContext {
	req: Request,
	connection: Connection
}