const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context) {
	const endpoint = process.env['cosmosEndpoint'];
	const key = process.env['cosmosKey'];
	const client = new CosmosClient({ endpoint, key });

	const database = await client.database(process.env['cosmosDatabase']);
	const container = database.container(process.env['cosmosContainer']);
	const { resources } = await container.items.readAll().fetchAll();

	const count = resources[0].count;
	const updatedCount = count + 1;
	const item = resources[0];
	item.count = updatedCount;
	await container.item('1').replace(item);

	const responseMessage = {
		id: item.id,
		count: item.count,
	};

	context.res = {
		body: responseMessage,
	};
};
