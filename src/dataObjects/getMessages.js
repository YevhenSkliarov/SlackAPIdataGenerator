const config = require('../../config');
const client = require('../connection');

async function getMessages(channelId){
  try {
    const result = await client.conversations.history({
        //team_id: config.team_id,
        channel: channelId,
      });

    let conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory.length + " messages found in " + channelId);
    return conversationHistory;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = getMessages;