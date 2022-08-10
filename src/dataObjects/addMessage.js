const config = require('../../config');
const client = require('./../connection');


async function postMessage(channelId){
try {
  const result = await client.chat.postMessage({
    channel: channelId,
    text: config.message
  });

  console.log(result);
}
catch (error) {
  console.error(error);
}
}

module.exports = postMessage;