import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import { createConnection } from 'typeorm';

@Resolver()
class HelloResolver {
	@Query(() => String)
	async helloWorld() {
		return "Hello World!";
	}
}

const app = async () => {
	await createConnection();

	const schema = await buildSchema({
		resolvers: [HelloResolver],
	});

	const apolloServer = new ApolloServer({
		schema
	});

	const app = Express();

	apolloServer.applyMiddleware({ app });

	app.listen(5656, () => {
		console.log(`Listening on http://localhost:5656/graphql`);
	});
}

app();
