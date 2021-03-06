var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fuseListRoute() {
    var fuseList = new express.Router();
    fuseList.use(cors());
    fuseList.use(bodyParser());


    // GET REST endpoint - query params may or may not be populated
    fuseList.all('/', function(req, res) {
        // FUSE URL (Pending Fuse deployment on OpenShift + AWS for public IP's):
        // http://localhost:9191/opportunity/getList

        var getListUrl = 'http://' + process.env.FUSE_HOST + ':' + process.env.FUSE_PORT + '/opportunity/getList';

        request.get({
            url: getListUrl,
            json: true
        }, function(error, response, body) {
            if (error) {
                return res.status(500).json(error);
            }
            console.log(body);
            return res.json(body);
        });
    });

    return fuseList;
}

module.exports = fuseListRoute;
