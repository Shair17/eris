import Server from './server';
import mongoose from 'mongoose';

async function main() {
	const app = await Server({
		logger: true,
		disableRequestLogging: true,
		ignoreTrailingSlash: true,
	});

	mongoose.connect(app.config.MONGODB_URI);
	mongoose.connection.on('open', () => {
		app.log.info('Database connection established');
	});
	mongoose.connection.on('error', (err) => {
		app.log.error(`Connection error ${err}`);
	});
	mongoose.connection.on('disconnected', () => {
		app.log.fatal('Database connection disconnected');
	});

	if (!!(require.main && module.children)) {
		await app.listen(+app.config.PORT, '0.0.0.0');
	}
}

main();
