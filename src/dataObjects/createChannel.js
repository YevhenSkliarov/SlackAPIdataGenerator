const config = require('../../config');
const client = require('./../connection');


async function createChannel(name){
    try {
        const result = await client.conversations.create({
          name: name,
          team_id: config.team_id,
          is_private: config.is_private
        });
        console.log(result);
      }
      catch (error) {
        console.error(error);
      }
}

module.exports = createChannel