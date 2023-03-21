const { CosmosClient } = require('@azure/cosmos');
const settings = require('../local.settings.json');

module.exports = async function (context) {
	const endpoint = settings.Values.cosmosEndpoint;
	const key = settings.Values.cosmosKey;
	const client = new CosmosClient({ endpoint, key });

	const database = await client.database(settings.Values.cosmosDatabase);
	const container = database.container(settings.Values.cosmosContainer);
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
