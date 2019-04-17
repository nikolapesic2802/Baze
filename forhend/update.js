var path='http://localhost:3000/db/';
function update()
{
	$("window").ready(() => {
        var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
		var i=parseInt(index,10);
		if(i%3!=0)
			document.getElementById("background").innerHTML="";
		else
			return;
		if(i==1) //Vozac insert
		{
			document.getElementById("background").style.top="5vh";
			document.getElementById("background").style.height="90vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke vozaca:</p>";
			document.getElementById("background").innerHTML+="<label for=\"id\">Id:</label>&nbsp;<input type=\"text\" id=\"id\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"ime\">Ime:</label>&nbsp;<input type=\"text\" id=\"ime\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"prezime\">Prezime:</label>&nbsp;<input type=\"text\" id=\"prezime\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"broj_licne_karte\">Broj licne karte:</label>&nbsp;<input type=\"text\" id=\"broj_licne_karte\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"pocetak_radnog_vremena\">Pocetak radnog vremena:</label>&nbsp;<input type=\"text\" id=\"pocetak_radnog_vremena\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"kraj_radnog_vremena\">Kraj radnog vremena:</label>&nbsp;<input type=\"text\" id=\"kraj_radnog_vremena\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"autobus_id\">Id autobusa:</label>&nbsp;<input type=\"text\" id=\"autobus_id\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"linija_id\">Id linije:</label>&nbsp;<input type=\"text\" id=\"linija_id\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Insert!\" onclick=\"vozacInsert()\">";
		}
		if(i==2) //Vozac delete
		{
			document.getElementById("background").style.top="30vh";
			document.getElementById("background").style.height="40vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke vozaca:</p>";
			document.getElementById("background").innerHTML+="<label for=\"id\">Id:</label>&nbsp;<input type=\"text\" id=\"id\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Delete!\" onclick=\"vozacDelete()\">";
		}
		if(i==4) //Autobus insert
		{
			document.getElementById("background").style.top="22vh";
			document.getElementById("background").style.height="56vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke autobusa:</p>";
			document.getElementById("background").innerHTML+="<label for=\"registracija\">Registracija:</label>&nbsp;<input type=\"text\" id=\"registracija\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"broj_sedista\">Broj_sedista:</label>&nbsp;<input type=\"text\" id=\"broj_sedista\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"brzina\">Brzina:</label>&nbsp;<input type=\"text\" id=\"brzina\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Insert!\" onclick=\"autobusInsert()\">";
		}
		if(i==5) //Autobus delete
		{
			document.getElementById("background").style.top="30vh";
			document.getElementById("background").style.height="40vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke autobusa:</p>";
			document.getElementById("background").innerHTML+="<label for=\"registracija\">Registracija:</label>&nbsp;<input type=\"text\" id=\"registracija\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Delete!\" onclick=\"autobusDelete()\">";
		}
		if(i==7) //Linija insert
		{
			document.getElementById("background").style.top="30vh";
			document.getElementById("background").style.height="40vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke linije:</p>";
			document.getElementById("background").innerHTML+="<label for=\"oznaka\">Oznaka:</label>&nbsp;<input type=\"text\" id=\"oznaka\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Insert!\" onclick=\"linijaInsert()\">";
		}
		if(i==8) //Linija delete
		{
			document.getElementById("background").style.top="30vh";
			document.getElementById("background").style.height="40vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke linije:</p>";
			document.getElementById("background").innerHTML+="<label for=\"oznaka\">Oznaka:</label>&nbsp;<input type=\"text\" id=\"oznaka\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Delete!\" onclick=\"linijaDelete()\">";
		}
		if(i==10) //Stanica insert
		{
			document.getElementById("background").style.top="15vh";
			document.getElementById("background").style.height="70vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke stanice:</p>";
			document.getElementById("background").innerHTML+="<label for=\"redni_broj\">Redni broj:</label>&nbsp;<input type=\"text\" id=\"redni_broj\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"naziv\">Naziv:</label>&nbsp;<input type=\"text\" id=\"naziv\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"lokacija\">Lokacija:</label>&nbsp;<input type=\"text\" id=\"lokacija\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"stanica_po_redu\">Stanica po redu:</label>&nbsp;<input type=\"text\" id=\"stanica_po_redu\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"linija\">Linija:</label>&nbsp;<input type=\"text\" id=\"linija\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Insert!\" onclick=\"stanicaInsert()\">";
		}
		if(i==11) //Stanica delete
		{
			document.getElementById("background").style.top="30vh";
			document.getElementById("background").style.height="40vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke stanice:</p>";
			document.getElementById("background").innerHTML+="<label for=\"redni_broj\">Redni broj:</label>&nbsp;<input type=\"text\" id=\"redni_broj\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Delete!\" onclick=\"stanicaDelete()\">";
		}
		if(i==13) //Udaljenost insert
		{
			document.getElementById("background").style.top="20vh";
			document.getElementById("background").style.height="60vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke udaljenosti:</p>";
			document.getElementById("background").innerHTML+="<label for=\"id\">Id:</label>&nbsp;<input type=\"text\" id=\"id\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"udaljenost\">Udaljenost:</label>&nbsp;<input type=\"text\" id=\"udaljenost\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"stanica_id_1\">Stanica id 1:</label>&nbsp;<input type=\"text\" id=\"stanica_id_1\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<label for=\"stanica_id_2\">Stanica id 2:</label>&nbsp;<input type=\"text\" id=\"stanica_id_2\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Insert!\" onclick=\"udaljenostInsert()\">";
		}
		if(i==14) //Udaljenost delete
		{
			document.getElementById("background").style.top="30vh";
			document.getElementById("background").style.height="40vh";
			document.getElementById("background").innerHTML+="<p>Unesi podatke udaljenosti:</p>";
			document.getElementById("background").innerHTML+="<label for=\"id\">Id:</label>&nbsp;<input type=\"text\" id=\"id\" required size=\"20\"><br>";
			document.getElementById("background").innerHTML+="<input type=\"button\" value=\"Delete!\" onclick=\"udaljenostDelete()\">";
		}
    });
}
function vozacInsert(){
	var text='{"id":'+document.getElementById("id").value+',"ime":"'+
		document.getElementById("ime").value+'","prezime":"'+
		document.getElementById("prezime").value+'","broj_licne_karte":"'+
		document.getElementById("broj_licne_karte").value+'","pocetak_radnog_vremena":"'+
		document.getElementById("pocetak_radnog_vremena").value+'","kraj_radnog_vremena":"'+
		document.getElementById("kraj_radnog_vremena").value+'","autobus_id":"'+
		document.getElementById("autobus_id").value+'","linija_id":'+
		document.getElementById("linija_id").value+'}';
	fetch(path+'vozac',{
			body:text,
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function vozacDelete(){
	var text='{"id":'+document.getElementById("id").value+'}';
	fetch(path+'vozac',{
		body:text,
		method: 'DELETE',
		mode: 'cors',
		headers: { 
			'content-type': 'application/json'
		}
	})
	.catch(err => {
		window.alert('Error! \n' + err.message);
	});
}
function autobusInsert(){
	var text='{"registracija":"'+document.getElementById("registracija").value+'","broj_sedista":'+
		document.getElementById("broj_sedista").value+',"brzina":'+
		document.getElementById("brzina").value+'}';
	fetch(path+'autobus',{
			body:text,
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function autobusDelete(){
	var text='{"registracija":"'+document.getElementById("registracija").value+'"}';
	fetch(path+'autobus',{
		body:text,
		method: 'DELETE',
		mode: 'cors',
		headers: { 
			'content-type': 'application/json'
		}
	})
	.catch(err => {
		window.alert('Error! \n' + err.message);
	});
}
function linijaInsert(){
	var text='{"oznaka":'+document.getElementById("oznaka").value+'}';
	fetch(path+'linija',{
			body:text,
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function linijaDelete(){
	var text='{"oznaka":'+document.getElementById("oznaka").value+'}';
	fetch(path+'linija',{
		body:text,
		method: 'DELETE',
		mode: 'cors',
		headers: { 
			'content-type': 'application/json'
		}
	})
	.catch(err => {
		window.alert('Error! \n' + err.message);
	});
}
function stanicaInsert(){
	var text='{"redni_broj":'+document.getElementById("redni_broj").value+',"naziv":"'+
		document.getElementById("naziv").value+'","lokacija":"'+
		document.getElementById("lokacija").value+'","stanica_po_redu":'+
		document.getElementById("stanica_po_redu").value+',"linija":'+
		document.getElementById("linija").value+'}';
	fetch(path+'stanica',{
			body:text,
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function stanicaDelete(){
	var text='{"redni_broj":'+document.getElementById("redni_broj").value+'}';
	fetch(path+'stanica',{
		body:text,
		method: 'DELETE',
		mode: 'cors',
		headers: { 
			'content-type': 'application/json'
		}
	})
	.catch(err => {
		window.alert('Error! \n' + err.message);
	});
}
function udaljenostInsert(){
	var text='{"id":'+document.getElementById("id").value+',"udaljenost":'+
		document.getElementById("udaljenost").value+',"stanica_id_1":'+
		document.getElementById("stanica_id_1").value+',"stanica_id_2":'+
		document.getElementById("stanica_id_2").value+'}';
	fetch(path+'udaljenost',{
			body:text,
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function udaljenostDelete(){
	var text='{"id":'+document.getElementById("id").value+'}';
	fetch(path+'udaljenost',{
		body:text,
		method: 'DELETE',
		mode: 'cors',
		headers: { 
			'content-type': 'application/json'
		}
	})
	.catch(err => {
		window.alert('Error! \n' + err.message);
	});
}
function back(){
	window.location.replace("./userselect.html");
}
function move(i)
{
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	window.location.replace("./update.html?"+(parseInt(index,10)+parseInt(i,10)));
}