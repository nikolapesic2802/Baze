var mysql=require('mysql');

var con=mysql.createConnection({
	host:"localhost",
	user:"user",
	password:"useruser",
	database:"db"
});
var express = require('express');
const port = 3000;
const cors = require('cors');
var app = express();
var bodyparser = require('body-parser');
function compare(a,b)
{
	if(a.stanica_po_redu<b.stanica_po_redu)
		return -1;
	return 1;
}
app.use(cors());

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
con.connect((err)=>{
	if(err)throw err;
	var ruter = express.Router();
	ruter
		.get('/stanica', function(req, res) {
			var sql="SELECT naziv,lokacija,stanica_po_redu,linija FROM stanica";
			con.query(sql,(err,result,fields)=>{
				if(err) throw err;
				res.json(result);
			});
		})
		.put('/nextbus', function(req, res) {
			var sql='SELECT redni_broj,stanica_po_redu FROM stanica where linija='+req.body.linija;
			con.query(sql,(err,result,fields)=>{
				if(err) throw err;
				var sum=0,n=result.length;
				result.sort(compare);
				for(var i=0;i<n;i++)
				{
					var s='SELECT udaljenost from udaljenost where stanica_id_1='+result[i].redni_broj+' and stanica_id_2='+result[(i+1)%n].redni_broj;
					con.query(s,(err1,result1,fields1)=>{
						if(err1)throw err1;
						sum+=result1[0].udaljenost;
						console.log(sum);
						console.log(i);
						if(i==n-1)
						{
							console.log(sum);
						}
					});
				}
				console.log(n);
				console.log(sum);
				res.json(result);
				
			});
		})
		.post('/vozac',function(req,res){
			var sql='insert into vozac (id,ime,prezime,broj_licne_karte,pocetak_radnog_vremena,kraj_radnog_vremena,autobus_id,linija_id) values ('+req.body.id+',"'+req.body.ime+'","'+req.body.prezime+'","'+req.body.broj_licne_karte+'","'+req.body.pocetak_radnog_vremena+'","'+req.body.kraj_radnog_vremena+'","'+req.body.autobus_id+'",'+req.body.linija_id+')';
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.delete('/vozac',function(req,res){
			var sql='delete from vozac where id='+req.body.id;
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.post('/autobus',function(req,res){
			var sql='insert into autobus (registracija,broj_sedista,brzina) values ("'+req.body.registracija+'",'+req.body.broj_sedista+','+req.body.brzina+')';
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.delete('/autobus',function(req,res){
			var sql='delete from autobus where registracija="'+req.body.registracija+'"';
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.post('/linija',function(req,res){
			var sql='insert into linija (oznaka) values ('+req.body.oznaka+')';
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.delete('/linija',function(req,res){
			var sql='delete from linija where oznaka='+req.body.oznaka;
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.post('/stanica',function(req,res){
			var sql='insert into stanica (redni_broj,naziv,lokacija,stanica_po_redu,linija) values ('+req.body.redni_broj+',"'+req.body.naziv+'","'+req.body.lokacija+'",'+req.body.stanica_po_redu+','+req.body.linija+')';
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.delete('/stanica',function(req,res){
			var sql='delete from stanica where redni_broj='+req.body.redni_broj;
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.post('/udaljenost',function(req,res){
			var sql='insert into udaljenost (id,udaljenost,stanica_id_1,stanica_id_2) values ('+req.body.id+','+req.body.udaljenost+','+req.body.stanica_id_1+','+req.body.stanica_id_2+')';
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
		.delete('/udaljenost',function(req,res){
			var sql='delete from udaljenost where id='+req.body.id;
			con.query(sql,(err,result,fields)=>{
				if(err)throw err;
				res.json(result);
			});
		})
	app.use('/db', ruter);

	app.listen(port);
	console.log('Server radi na portu ' + port);
});
