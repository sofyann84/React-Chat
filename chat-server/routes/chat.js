var express = require('express');
var router = express.Router();
const moment = require('moment');
var Chat = require('../models/Chat')


/* GET users listing. */
router.get('/', function (req, res, next) {
  Chat.find().sort({ createdAt: 1 })
    .then(result => {
      let data = result.map(item => {
        return {
          _id: item._id,
          id: item.chatId,
          name: item.name,
          message: item.message,
          date: moment(item.createdAt).format("YYYY-MM-DD"),
          time: moment(item.createdAt).format("LT")
        }
      })
      res.json({
        error: false,
        data: data
      })
    })
    .catch(err => res.json(err))
});


router.post('/', function (req, res, next) {
  Chat.create({ chatId: req.body.id, name: req.body.name, message: req.body.message })
    .then(result => {
      res.json({
        error: false,
        chat: result
      })
    })
    .catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
});


router.delete('/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  Chat.findOneAndRemove({ chatId: id })
    .then(result => {
      res.json({
        error: false,
        delete: result
      })
    })
    .catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
});

module.exports = router;




