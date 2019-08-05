import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

/**
 * @returns {Object} - current user object
 * @param {string} token header
 */
export const verifyToken = async ( token: string ) => {
	let user = null;
	if (! token ) { //no token in the header
		throw new Error('No token provided');
	}
	await jwt.verify( token, process.env.APP_SECRET!, async (err, data: any) => {
		if ( err ) {
			throw new Error('Invalid token!')
		} else {
			user = await User.findOne( data.userID, { relations: ['recipes'] } );
		}
	});
	if ( ! user ) {
		throw new Error('User does not exist')
	}
	return user;
}