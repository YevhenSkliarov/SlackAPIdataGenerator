const createChannel = require('./../dataObjects/createChannel');
const listOfChannels = require('./../dataObjects/listOfChannels');
const createMessage = require('./../dataObjects/addMessage');
const uploadFile = require('./../dataObjects/uploadFile');
const getMessages = require('./../dataObjects/getMessages');
const docxConfig = require('./../fileConfigs/docxConfig');
const pdfConfig = require('./../fileConfigs/pdfConfig');
const txtConfig = require('./../fileConfigs/txtConfig');
const csvConfig = require('./../fileConfigs/csvConfig');
const config = require('../../config');

async function wait(timeout = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

function addPublicChannels(config = {}){
    for(let i = 0; i < config.count_of_public_channels; i++){
        createChannel("public-" + config.name + "-" + (i+1));
    }
}

function addPrivateChannels(config = {}){
    for(let i = 0; i < config.count_of_private_channels; i++){
        config.is_private = true;
        createChannel("private-" + config.name + "-" + (i+1));
    }
}

async function getChannelsIdList(){
    const publicList = await listOfChannels('public_channel');
    const privateList = await listOfChannels('private_channel');
    const public = publicList.filter(i => i.name.startsWith('public')).map(i=> i.id);
    const private = privateList.filter(i => i.name.startsWith('private')).map(i=> i.id);
    return [...public, ...private];
}

async function addMesages(channelsIdList, config){
    for(let i = 0; i < channelsIdList.length; i++){
        for(let j = 0; j < config.message_count; j++){
            createMessage(channelsIdList[i]);
            await wait();
        }
    }
}

function addFiles(channelsIdList, config){
    for(let i = 0; i < channelsIdList.length; i++){
        for(let j = 0; j < config.files_count; j++){
            uploadFile(channelsIdList[i], docxConfig);
            uploadFile(channelsIdList[i], pdfConfig);
            uploadFile(channelsIdList[i], txtConfig);
            uploadFile(channelsIdList[i], csvConfig);
            
        }
    }
}

async function getMessagesCount(channelsIdList){
    let messages = [];
    for(let i = 0; i < channelsIdList.length; i++){
        messages.push(...await getMessages(channelsIdList[i]));
    }
    console.log(messages.length + " messages found in current workspace " + config.team_id);
    return messages.length;
}

async function generateData(config = {}, messages = false ){
    addPublicChannels(config);
    addPrivateChannels(config);
    const result = await getChannelsIdList();
    if(messages){
        await getMessagesCount(result)
    }
    await addMesages(result, config);
    addFiles(result, config);
}

module.exports = generateData;