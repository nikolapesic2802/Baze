var mysql=require('mysql');

var con=mysql.createConnection({
	host:"localhost",
	user:"user",
	password:"useruser",
	database:"nekretnine"
});
con.connect((err)=>{
	if(err)throw err;
	console.log("Connected!");
});

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');*/
var express = require('express');
const port = 3000;
/*const cors = require('cors');
var app = express();
var bodyparser = require('body-parser');
var Profesori = require('./schema/Profesor');

app.use(cors());

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());*/

var ruter = express.Router();
ruter
    .get('/', function(req, res) {
        Profesori.find({}, function(err, data, next){
            res.json(data);
        });
    })
    /*.get('/:id/komentari', function(req, res, next) {
        Profesori.findOne({
                "_id": req.params.id
        },{"_id":0,"komentari":1}).exec(function(err, entry) {
            if(err) next(err);
            res.json(entry);
        });
    })
	.put('/:id/ocene', function(req, res, next)
    {
        Profesori.findOneAndUpdate({_id: req.params.id}, {$push: {ocene: req.body}}, function (err, x) {
            if(err) return next(err);
            Profesori.find({_id:req.params.id},'ocene', (err,docs) => {
                if(err) return next(err);
                var sum = 0;
                const ocene = docs[0].ocene;
                for(var i = 0; i < ocene.length; i++)
                {
                    sum += ocene[i].ocena;
                }
                sum /= ocene.length;
                Profesori.findByIdAndUpdate({_id: req.params.id},{$set : {srednjaOcena:sum}}, err => {
                    if(err) return next(err);
                    res.send(x);
                });
            });

        });
    })
    .put('/:id/komentar', function(req, res, next)
    {
        Profesori.findOneAndUpdate({_id: req.params.id}, {$push: {komentari: req.body}}, function (err, x) {
            if(err) return next(err);
			res.send(x);
        });
    })
    .put('/:id/komentar/:idkomentar/like', function(req, res, next){
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$inc: {"komentari.$.likes": +1}}, function (err, x){
            if(err) next(err);
            res.send(x);
        });
    })
	.put('/:id/komentar/:idkomentar/hide', function(req, res, next){
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$set: {"komentari.$.hide": 1}}, function (err, x){
            if(err) next(err);
            res.send(x);
        });
    })
	.put('/:id/komentar/:idkomentar/unhide', function(req, res, next){
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$set: {"komentari.$.hide": 0}}, function (err, x){
            if(err) next(err);
            res.send(x);
        });
    })
    .put('/:id/komentar/:idkomentar/dislike', function(req, res, next){
        var prof = {_id : req.params.id, komentari: {$elemMatch: {_id:req.params.idkomentar}}};
        Profesori.update(prof, {$inc: {"komentari.$.dislikes": +1}}, function (err, x){
            if(err) next(err);
            res.send(x);
        });
    })
    .post('/', function(req, res, next){
        Profesori.create(req.body, function(err, entry) {
            if (err) next(err);
            res.json(entry);
        });
    })
	.delete('/', function(req, res, next){
		Profesori.remove(req.body, function(err,entry) {
			if (err) next(err);
            res.json(entry);
        });
    })*/
		

app.use('/db', ruter);


app.listen(port);
console.log('Server radi na portu ' + port);
