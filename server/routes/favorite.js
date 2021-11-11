const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
  const {movieId} = req.body;

  Favorite.find({movieId})
    .exec((err, info) => {
      if(err) {
        return res.status(400).send(err);
      }

      return res.status(200).json({success:true, favoriteNumber: info.length});
    });
});

router.post('/favorited', (req, res) => {
  const {movieId, userFrom} = req.body;

  Favorite.find({movieId, userFrom})
    .exec((err, info) => {
      if(err) {
        return res.status(400).send(err);
      }
      let result = false;
      if(info.length !== 0) {
        result = true;
      }

      return res.status(200).json({success:true, favorited: result});
    });
});

router.post('/addToFavorite', (req, res) => {
  const favortie = new Favorite(req.body);
  favortie.save((err, doc) => {
    if(err) {
      return res.status(400).send(err);
    }

    return res.status(200).json({success: true});
  });
});

router.post('/removeFromFavorite', (req, res) => {
  const {movieId, userFrom} = req.body
  Favorite.findOneAndDelete({movieId, userFrom})
    .exec((err, doc) => {
      if(err) {
        return res.status(400).send(err);
      }

      return res.status(200).json({success: true});
    });
});

router.post('/getFavoredMoive', (req, res) => {
  const {userFrom} = req.body;
  Favorite.find({userFrom})
    .exec((err, favorites) => {
      if(err) {
        return res.status(400).send(err);
      }

      return res.status(200).json({ success: true, favorites });
    });
});

router.post('/removeFormFavorite', (req, res) => {
  const {movieId, userFrom} = req.body;
  Favorite.findOneAndDelete({movieId, userFrom})
    .exec((err, result) => {
      if(err) {
        return res.status(400).send(err)
      }

      return res.status(200).json({ success: true})
    })
});

module.exports = router;
