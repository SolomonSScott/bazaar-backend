import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';
import { CreateRecipeResolver } from './modules/recipe/Create';
import { RecipesResolver } from './modules/recipe/Recipes';
import { DeleteRecipesResolver } from './modules/recipe/Delete';

const app = async () => {
	const connection = await createConnection();

	const schema = await buildSchema({
		resolvers: [RegisterResolver, LoginResolver, MeResolver, CreateRecipeResolver, RecipesResolver, DeleteRecipesResolver],
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({req}: any) => ({ req, connection })
	});

	const app = Express();

	app.use(session({
		name: "qid",
		secret: process.env.APP_SECRET!,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
		}
	}));

	apolloServer.applyMiddleware({ app });

	app.listen(5656, () => {
		console.log(`Listening on http://localhost:5656/graphql`);
	});
}

app();
