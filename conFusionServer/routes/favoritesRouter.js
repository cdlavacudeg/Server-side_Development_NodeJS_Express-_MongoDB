const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites=require('../models/favorite');

const favoriteRouter=express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions,authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Favorites.find({user:req.user._id})
    .populate('user').populate('dish')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.create({user:req.user._id,dish:req.body})
    .then((favorite) => {
        console.log('Favorite Dish Created ', favorite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) =>{
        err = new Error('Duplicate favorite dish found');//model of favorites
        err.status = 404;
        return next(err);
        } )
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.find({user:req.user._id}).remove()
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Favorites.find({user:req.user._id,dish:req.params.dishId})
    .populate('user').populate('dish')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.create({user:req.user._id,dish:req.params.dishId})
    .then((favorite) => {
        console.log('Favorite Dish Created ', favorite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => {
        err = new Error('Duplicate favorite dish found');//model of favorites
        err.status = 404;
        return next(err);
        })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/'+req.params.dishId);
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.find({user:req.user._id,dish:req.params.dishId}).remove()
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favoriteRouter;