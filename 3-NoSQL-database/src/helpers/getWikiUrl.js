module.exports = getWikiUrl = (topicName) => {
    return `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${topicName}`;
};
