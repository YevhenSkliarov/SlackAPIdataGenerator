const config = require('../../config');
const client = require('./../connection');

async function populateConversationStore(type) {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list({
        team_id: config.team_id,
        types: type
    });
    return result.channels;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = populateConversationStore;