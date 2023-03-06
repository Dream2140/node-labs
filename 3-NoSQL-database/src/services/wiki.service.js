const fetch = require('node-fetch');

const getWikiUrl = require('../helpers/getWikiUrl');

const wikiRepository = require('../repositories/wiki.repository');

class WikiService {

    getTopic = async (topicName) => {

        if (await wikiRepository.hasTopic(topicName)) {
            return await wikiRepository.getTopic(topicName);
        }

        const response = await fetch(getWikiUrl(topicName));
        const data = await response.json();

        await wikiRepository.setTopic(topicName, data);

        return data;
    }
}


module.exports = new WikiService();
