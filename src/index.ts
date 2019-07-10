import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';

const app = async () => {
	await createConnection();

	const schema = await buildSchema({
		resolvers: [RegisterResolver, LoginResolver],
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({req}: any) => ({ req })
	});

	const app = Express();

	app.use(cookieParser());

	apolloServer.applyMiddleware({ app });

	app.listen(5656, () => {
		console.log(`Listening on http://localhost:5656/graphql`);
	});
}

app();
