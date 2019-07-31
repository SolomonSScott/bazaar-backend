import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import resolvers from './schema';
import { verifyToken } from './helpers/verifyToken';

const app = async () => {
	const connection = await createConnection();

	const schema = await buildSchema({
		resolvers,
	});

	const apolloServer = new ApolloServer({
		schema,
		context: async ({ req, res }: any) => {
			let user = null;
			if ('authorization' in req.headers ) {
				const token = req.headers['authorization'].replace('Bearer: ', '');
				user = await verifyToken( token );
			}

			return {
				req, res, connection, user
			}
		}
	});

	const app = Express();

	apolloServer.applyMiddleware({ app });

	app.listen(5656, () => {
		console.log(`Listening on http://localhost:5656/graphql`);
	});
}

app();
