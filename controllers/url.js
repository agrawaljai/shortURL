const shortid = require("shortid");
const URL = require("../models/url");


async function generateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required'});
    const shortID = shortid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        CreatedBy: req.user._id,
    });
    
    return res.render("home", {
        id: shortID,
    });
    

}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });
    if(!result) {
        res.status(404).json({ error: "URL not found"});
    } else {
        res.json({ totalClicks:result.visitHistory.length, analytics:result.visitHistory });
    }
}

async function searchAndRedirect(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, 
    { 
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },

        },
    }
    );
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    } else {
        res.redirect(entry.redirectURL);
    }
};

module.exports = {
    generateNewShortURL,
    getAnalytics,
    searchAndRedirect,
}