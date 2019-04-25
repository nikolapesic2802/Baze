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
function convertTimeToInt(po)
{
	po=po.split(':');
	po=(+po[0])*60*60+(+po[1])*60+(+po[2]);
	return po;
}
function convertIntToTime(po)
{
	var ret=po%60;
	if(po%60<10)
		ret='0'+ret;
	ret=Math.floor(po/60)%60+':'+ret;
	if(Math.floor(po/60)%60<10)
		ret='0'+ret;
	ret=Math.floor(po/3600)+':'+ret;
	if(Math.floor(po/3600)<10)
		ret='0'+ret;
	return ret;
}
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
				var sum=0,n=result.length,count=0,sum_do_trenutnog=0;
				result.sort(compare);
				for(var i=0;i<n;i++)
				{
					var s='SELECT udaljenost from udaljenost where stanica_id_1='+result[i].redni_broj+' and stanica_id_2='+result[(i+1)%n].redni_broj;
					con.query(s,(err1,result1,fields1)=>{
						if(err1)throw err1;
						count++;
						if(count==req.body.stanica_po_redu)
							sum_do_trenutnog=sum;
						sum+=result1[0].udaljenost;
						if(count==n)
						{
							var ss='select brzina,pocetak_radnog_vremena,kraj_radnog_vremena from vozac join autobus on vozac.autobus_id=autobus.registracija where vozac.linija_id='+req.body.linija;
							con.query(ss,(err2,vremena,fields1)=>{
								if(err2) throw err2;
								var najbolje=99999999;
								vremena.forEach(element=>{
									var poc=+convertTimeToInt(element.pocetak_radnog_vremena)+ +Math.ceil(+sum_do_trenutnog/(+element.brzina));
									var kraj=convertTimeToInt(element.kraj_radnog_vremena);
									var moj=convertTimeToInt(req.body.vreme);
									if(poc<=moj&&kraj>=moj)
									{
										var tr=poc;
										while(tr<moj&&tr<=kraj)
										{
											tr=+tr+ +Math.ceil(+sum/(+element.brzina));
										}
										if(tr<=kraj)
										{
											if(tr-moj<najbolje-moj)
												najbolje=tr;
										}
									}
								});
								if(najbolje==99999999)
								{
									res.json(-1);
								}
								else
								{
									najbolje=convertIntToTime(najbolje);
									res.json(najbolje);
								}
							});
						}
					});
				}
			});
		})
		.put('/findpath', function(req,res){
			var sql='select oznaka from linija where "'+req.body.stanica1+'" IN (select naziv from stanica where stanica.linija = linija.oznaka) AND "'+req.body.stanica2+'" in (select naziv from stanica where stanica.linija=linija.oznaka)';
			con.query(sql,(err,linije,fields)=>{
				if(err)throw err;
				if(linije.length==0)
				{
					res.json(-1);
					return;
				}
				var retvalue='[';
				var brojim=0;
				var len=0+ +linije.length;
				linije.forEach(element=>{
					var sred1='select stanica_po_redu from stanica where linija = ' + element.oznaka + ' and naziv = "' + req.body.stanica1 + '"';
					var sred2='select stanica_po_redu from stanica where linija = ' + element.oznaka + ' and naziv = "' + req.body.stanica2 + '"';
					con.query(sred1,(err1,red1,fields1)=>{
						if(err1)throw err1;
						
						con.query(sred2,(err2,red2,fields2)=>{
							if(err2)throw err2;
							red1=+red1[0].stanica_po_redu;
							red2=+red2[0].stanica_po_redu;
							var sql='SELECT redni_broj,stanica_po_redu FROM stanica where linija='+element.oznaka;
							con.query(sql,(err,result,fields)=>{
								if(err) throw err;
								var sum=0,n=result.length,count=0,sum_do_prvog=0,sum_do_drugog;
								result.sort(compare);
								brojim=+brojim+1;
								if(brojim==len)
								{
									for(var i=0;i<n;i++)
									{
										var s='SELECT udaljenost from udaljenost where stanica_id_1='+result[i].redni_broj+' and stanica_id_2='+result[(i+1)%n].redni_broj;
										con.query(s,(err1,result1,fields1)=>{
											if(err1)throw err1;
											count++;
											if(count==red1)
												sum_do_prvog=sum;
											if(count==red2)
												sum_do_drugog=sum;
											sum+=result1[0].udaljenost;
											if(count==n)
											{
												var razlika;
												if(red1<=red2)
													razlika=sum_do_drugog-sum_do_prvog;
												else
													razlika=sum-sum_do_prvog+sum_do_drugog;
												var ss='select brzina,pocetak_radnog_vremena,kraj_radnog_vremena from vozac join autobus on vozac.autobus_id=autobus.registracija where vozac.linija_id='+element.oznaka;
												con.query(ss,(err2,vremena,fields1)=>{
													if(err2) throw err2;
													var najbolje=99999999;
													var speed=-1;
													vremena.forEach(element1=>{
														var poc=+convertTimeToInt(element1.pocetak_radnog_vremena)+ +Math.ceil(+sum_do_prvog/(+element1.brzina));
														var kraj=+convertTimeToInt(element1.kraj_radnog_vremena)- +Math.ceil(+razlika/(+element1.brzina));
														var moj=convertTimeToInt(req.body.vreme);
														if(poc<=moj&&kraj>=moj)
														{
															var tr=poc;
															while(tr<moj&&tr<=kraj)
															{
																tr=+tr+ +Math.ceil(+sum/(+element1.brzina));
															}
															if(tr<=kraj)
															{
																if(tr-moj<najbolje-moj)
																{
																	najbolje=tr;
																	speed=element1.brzina;
																}
															}
														}
													});
													if(najbolje!=99999999)
													{
														najbolje=convertIntToTime(najbolje);
														if(retvalue.length!=1)
															retvalue=retvalue+',';
														retvalue=retvalue+'{"vreme":"'+najbolje+'","linija":'+element.oznaka+',"duzina":'+Math.ceil(+razlika/(+speed))+'}';
													}
													retvalue=retvalue+']';
													res.json(retvalue);
												});
											}
										});
									}
								}
								else
								{
									for(var i=0;i<n;i++)
									{
										var s='SELECT udaljenost from udaljenost where stanica_id_1='+result[i].redni_broj+' and stanica_id_2='+result[(i+1)%n].redni_broj;
										con.query(s,(err1,result1,fields1)=>{
											if(err1)throw err1;
											count++;
											if(count==red1)
												sum_do_prvog=sum;
											if(count==red2)
												sum_do_drugog=sum;
											sum+=result1[0].udaljenost;
											if(count==n)
											{
												var razlika;
												if(red1<=red2)
													razlika=sum_do_drugog-sum_do_prvog;
												else
													razlika=sum-sum_do_prvog+sum_do_drugog;
												var ss='select brzina,pocetak_radnog_vremena,kraj_radnog_vremena from vozac join autobus on vozac.autobus_id=autobus.registracija where vozac.linija_id='+element.oznaka;
												con.query(ss,(err2,vremena,fields1)=>{
													if(err2) throw err2;
													var najbolje=99999999;
													var speed=-1;
													vremena.forEach(element1=>{
														var poc=+convertTimeToInt(element1.pocetak_radnog_vremena)+ +Math.ceil(+sum_do_prvog/(+element1.brzina));
														var kraj=+convertTimeToInt(element1.kraj_radnog_vremena)- +Math.ceil(+razlika/(+element1.brzina));
														var moj=convertTimeToInt(req.body.vreme);
														if(poc<=moj&&kraj>=moj)
														{
															var tr=poc;
															while(tr<moj&&tr<=kraj)
															{
																tr=+tr+ +Math.ceil(+sum/(+element1.brzina));
															}
															if(tr<=kraj)
															{
																if(tr-moj<najbolje-moj)
																{
																	najbolje=tr;
																	speed=element1.brzina;
																}
															}
														}
													});
													if(najbolje!=99999999)
													{
														najbolje=convertIntToTime(najbolje);
														if(retvalue.length!=1)
															retvalue=retvalue+',';
														retvalue=retvalue+'{"vreme":"'+najbolje+'","linija":'+element.oznaka+',"duzina":'+Math.ceil(+razlika/(+speed))+'}';
													}
												});
											}
										});
									}
								}
							});
						});
					});
					
				});
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
