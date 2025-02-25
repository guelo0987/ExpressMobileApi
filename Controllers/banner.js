const express = require('express')
const Banner = require('../Models/banner')


const bannerRouter = express.Router()


//upload banner to database
bannerRouter.post('/api/banner', async (req, res) => {
    try {
        const {image} = req.body
        let banner = new Banner({image})
        await banner.save()
        res.status(201).send(banner)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//download banners
bannerRouter.get('/api/banner', async (req, res) => {
    try {
        const banners = await Banner.find()
        return res.status(200).send(banners)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = bannerRouter