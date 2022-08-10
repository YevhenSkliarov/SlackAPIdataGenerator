const config = require('../../config');
const client = require('./../connection');
const fs = require('fs')

async function uploadFile(channelId, {
  filetype ='csv',
  content ='application/x-www-form-urlencoded',
  file = '../dataSet.csv',
  title = "Text File",
  filename = "dataSet.csv",
}){
try {
  const result = await client.files.upload({
    channels: channelId,
    filetype: filetype,
    content: content,
    file: fs.createReadStream(file),
    title: title,
    filename: filename,
    filetype: filetype,
  });

  console.log(result);
}
catch (error) {
  console.error(error);
}
}

module.exports = uploadFile;