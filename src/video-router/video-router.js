const express = require('express');
const videoRouter = express.Router();
const fs = require('fs');
const videoData = require('../assets/videosData');

// GET data array of each video
videoRouter
    .get('/', (req, res, next) => {
        res.json(videoData);
    });

// GET stream of video matching id
videoRouter
    .get('/:id', (req, res, next) => {
        try {
            const { id } = req.params;

            const video = videoData[id];
            const videoPath = `src/assets/${video.video_name}.mp4`;

            const videoStats = fs.statSync(videoPath);
            const fileSize = videoStats.size;

            const headers = {
                'content-type': 'video/mp4',
                'content-length': fileSize,
            };

            res.writeHead(200, headers);
            fs.createReadStream(videoPath).pipe(res);
        } catch(error) {
            console.error('Error', error);
            res.status(400).json('Something went wrong');
        }
    })

// GET data obj of video matching id
videoRouter
    .get('/:id/data', (req, res, next) => {
        const { id } = req.params;
        res.json(videoData[id]);
    })

module.exports = videoRouter;