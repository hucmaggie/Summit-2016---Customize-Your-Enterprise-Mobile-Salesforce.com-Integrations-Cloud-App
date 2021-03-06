var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fuseUpdateRoute() {
    var fuseUpdate = new express.Router();
    fuseUpdate.use(cors());
    fuseUpdate.use(bodyParser());


    // GET REST endpoint - query params may or may not be populated
    fuseUpdate.get('/', function(req, res) {
        // FUSE URL (Pending Fuse deployment on OpenShift + AWS for public IP's):
        // http://localhost:9191/opportunity/updateOpp/00628000008yT2Y/CLOSEWON

        var optId = req.query.optId;
        var updateOppUrl = 'http://' + process.env.FUSE_HOST + ':' + process.env.FUSE_PORT + '/opportunity/updateOpp/' + optId + "/CLOSEWON";
        // http://localhost:9191/opportunity/updateOpp/<SF_ID>/PROSPECTING

        request.get({
            url: updateOppUrl,
            json: true
        }, function(error, response, body) {
            if (error) {
                return res.status(500).json(error);
            }
            return res.json({msg: 'Opportunity: ' + optId + ' has been successfully closed.'});
            //return res.json(body);
        });
    });

    return fuseUpdate;
}

module.exports = fuseUpdateRoute;
