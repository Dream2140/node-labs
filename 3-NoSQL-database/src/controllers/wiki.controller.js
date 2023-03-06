const wikiService = require("../services/wiki.service");

class WikiController {
    getTopic = async (req, res) => {
        try {
            const topicName = req.params.topicName;

            const data = await wikiService.getTopic(topicName);

            return res.send(data);

        } catch (err) {
            console.error(err);

            res.status(err.cause?.status || 500).send({
                message: err.cause?.message || "Some error occurred while getting wiki topic."
            });
        }
    }
}

module.exports = new WikiController();

