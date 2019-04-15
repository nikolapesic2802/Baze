
function template(){
	$("#bb").css("background-color", getRandomColor());
	$("#t").css("background-color", getRandomColor());
	$("#nav").css("background-color", getRandomColor());
	$("window").ready(() => {
		var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
		var prof = window.sessionStorage.getItem('storage' + index);
		prof = JSON.parse(prof);
		prof.predmeti.forEach(element => {
			document.getElementById("predmeti").textContent +=element + ' ';
		});
		document.getElementById("slika").src = prof.slika;
		document.getElementById("naziv").innerHTML = prof.ime + " " + prof.prezime;
		document.getElementById("title").innerHTML = prof.ime + " " + prof.prezime;
		document.getElementById("ime").innerHTML = prof.ime + " " + prof.prezime;
		document.getElementById("srednja_ocena").innerHTML = prof.srednjaOcena;
		var i = 0;
		prof.komentari.forEach(element => {
			if(element.hide==0||element.hide==undefined)
			{
				document.getElementById("komentar").innerHTML += "<div id=\"a"+i+"\"><a>Title: " + element.title + "</a><input type=\"button\" id=\"absol\" value=\"Hide\" onclick=\"Sakri("+i+")\"><p>Text: " + element.komentar + "</p><a><font color=\"green\">" + element.likes + "</font><input type=\"image\" src=\"./slike/upvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"LikeKomentar(" + i + ")\"></a><a><font color=\"red\">" + element.dislikes + "</font><input type=\"image\" src=\"./slike/downvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"DislikeKomentar(" + i + ")\"></a></div>";
			}
			else
			{
				document.getElementById("komentar").innerHTML += "<div id=\"a"+i+"\"><a>Comment hidden!</a><input type=\"button\" id=\"absol\" value=\"Unhide\" onclick=\"Odsakri("+i+")\"></div>";
			}
			$("#a"+i).css("background-color", getRandomColor());
			$("#a"+i).css("position", "relative");
			i++;
		});
		Summary();
	});
	/*document.getElementById("title").textContent = profesori[0].title;
	document.getElementById("naziv").textContent = profesori[0].naziv;
    document.getElementById("ime").textContent = profesori[0].ime;
	document.getElementById("radnoMesto1").textContent = profesori[0].radnaMesta[0];*/
}
function Odsakri(komentarindex)
{
	let index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	let prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	let idprof = prof._id;
	let idkomentar = prof.komentari[komentarindex]._id;
	fetch('http://localhost:3000/profdb/' + idprof + '/komentar/' + idkomentar + '/unhide', {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		window.location.replace('./homepage.html');
	})
	.catch(err => {
		window.alert('An error occured! \n' + err.message);
	});
}
function Sakri(komentarindex)
{
	let index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	let prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	let idprof = prof._id;
	let idkomentar = prof.komentari[komentarindex]._id;
	fetch('http://localhost:3000/profdb/' + idprof + '/komentar/' + idkomentar + '/hide', {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		window.location.replace('./homepage.html');
	})
	.catch(err => {
		window.alert('An error occured! \n' + err.message);
	});
}
function Svepom(){
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	var prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	Sve(prof);
}
function Sve(prof) {
	document.getElementById("ocene1").innerHTML = "";
	prof.ocene.forEach(element => {
			document.getElementById("ocene1").innerHTML += "<a>"+element.ocena+" &nbsp;</a>";
	});
}
function Summary() {
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	var prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	var o = [0,0,0,0,0];
	document.getElementById("ocene1").innerHTML = "";
	prof.ocene.forEach(element => {
			o[element.ocena-1]++;
	});
	var i;
	for(i=5;i>0;i--)
	{
		document.getElementById("ocene1").innerHTML += "<p>Broj ocena "+i+": "+o[i-1]+"</p>";
	}
}
function Oceni() {
	let index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	let prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	let idprof = prof._id;
	let ocena = document.querySelector('input[name="ocena"]:checked').value;
	let doc = {
		ocena:Number.parseInt(ocena)
	}
	fetch('http://localhost:3000/profdb/' + idprof + '/ocene', {
		body: JSON.stringify(doc),
		method: 'PUT',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		if(json) {
			window.location.replace('./homepage.html');
		}
		else {
			window.alert('Ocenjivanje nije uspesno!');
		}
	})
	.catch(err => {
		window.alert('An error occured! \n' + err.message);
	});
}
function Komentarisi() {
	let index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	let prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	let idprof = prof._id;
	let title1 = document.getElementById('title1').value;
	let komentar1 = document.getElementById('komentar1').value;
	let doc = {
		title: title1,
		komentar: komentar1,
		likes: 0,
		dislikes: 0
	}
	fetch('http://localhost:3000/profdb/' + idprof + '/komentar/', {
		body: JSON.stringify(doc),
		method: 'PUT',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		if(json) {
			window.location.replace('./homepage.html');
		}
		else {
			window.alert('Komentar se nije uspesno postavio!');
		}
	})
	.catch(err => {
		window.alert('An error occured! \n' + err.message);
	});
}
function LikeKomentar(komentarindex) {
	let index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	let prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	let idprof = prof._id;
	let idkomentar = prof.komentari[komentarindex]._id;
	fetch('http://localhost:3000/profdb/' + idprof + '/komentar/' + idkomentar + '/like', {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		window.location.replace('./homepage.html');
	})
	.catch(err => {
		window.alert('An error occured! \n' + err.message);
	});
}

function DislikeKomentar(komentarindex) {
	let index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	let prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	let idprof = prof._id;
	let idkomentar = prof.komentari[komentarindex]._id;
	fetch('http://localhost:3000/profdb/' + idprof + '/komentar/' + idkomentar + '/dislike', {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		window.location.replace('./homepage.html');
	})
	.catch(err => {
		window.alert('An error occured! \n' + err.message);
	});
}
function WriteSortedOcene(orientation) {
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	var prof = window.sessionStorage.getItem('storage' + index);
	prof = JSON.parse(prof);
	if(orientation==1)
	{
		prof.ocene.sort(CompareOcene);
	}
	else
	{
		prof.ocene.sort(CompareOcene2);
	}
	Sve(prof);
}
function WriteSortedLikeDislike(orientation) {
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	var profesor = window.sessionStorage.getItem('storage' + index);
	profesor = JSON.parse(profesor);
	let komentari = profesor.komentari.map((element, index) => {
		return {
			index,
			value: element
		}
	});
	if(orientation==1)
	{
		komentari.sort(CompareLikeDislike);
	}
	else
	{
		komentari.sort(CompareLikeDislike2);
	}
	document.getElementById("komentar").innerHTML = "";
	komentari.forEach(element => {
		if(element.value.hide==0||element.value.hide==undefined)
		{
			document.getElementById("komentar").innerHTML += "<div id=\"a"+element.index+"\"><a>Title: " + element.value.title + "</a><input type=\"button\" id=\"absol\" value=\"Hide\" onclick=\"Sakri("+element.index+")\"><p>Text: " + element.value.komentar + "</p><a><font color=\"green\">" + element.value.likes + "</font><input type=\"image\" src=\"./slike/upvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"LikeKomentar(" + element.index + ")\"></a><a><font color=\"red\">" + element.value.dislikes + "</font><input type=\"image\" src=\"./slike/downvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"DislikeKomentar(" + element.index + ")\"></a></div>";
		}
		else
		{
			document.getElementById("komentar").innerHTML += "<div id=\"a"+element.index+"\"><a>Comment hidden!</a><input type=\"button\" id=\"absol\" value=\"Unhide\" onclick=\"Odsakri("+element.index+")\"></div>";
		}
		$("#a"+element.index).css("background-color", getRandomColor());
		$("#a"+element.index).css("position", "relative");
	});
}
function WriteSortedLikes(orientation) {
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	var profesor = window.sessionStorage.getItem('storage' + index);
	profesor = JSON.parse(profesor);
	let komentari = profesor.komentari.map((element, index) => {
		return {
			index,
			value: element
		}
	});
	if(orientation==1)
	{
		komentari.sort(CompareLikes);
	}
	else
	{
		komentari.sort(CompareLikes2);
	}
	document.getElementById("komentar").innerHTML = "";
	komentari.forEach(element => {
		if(element.value.hide==0||element.value.hide==undefined)
		{
			document.getElementById("komentar").innerHTML += "<div id=\"a"+element.index+"\"><a>Title: " + element.value.title + "</a><input type=\"button\" id=\"absol\" value=\"Hide\" onclick=\"Sakri("+element.index+")\"><p>Text: " + element.value.komentar + "</p><a><font color=\"green\">" + element.value.likes + "</font><input type=\"image\" src=\"./slike/upvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"LikeKomentar(" + element.index + ")\"></a><a><font color=\"red\">" + element.value.dislikes + "</font><input type=\"image\" src=\"./slike/downvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"DislikeKomentar(" + element.index + ")\"></a></div>";
		}
		else
		{
			document.getElementById("komentar").innerHTML += "<div id=\"a"+element.index+"\"><a>Comment hidden!</a><input type=\"button\" id=\"absol\" value=\"Unhide\" onclick=\"Odsakri("+element.index+")\"></div>";
		}
		$("#a"+element.index).css("background-color", getRandomColor());
		$("#a"+element.index).css("position", "relative");
	});
}

function WriteSortedDislikes(orientation) {
	var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
	var profesor = window.sessionStorage.getItem('storage' + index);
	profesor = JSON.parse(profesor);
	let komentari = profesor.komentari.map((element, index) => {
		return {
			index,
			value: element
		}
	});
	if(orientation==1)
	{
		komentari.sort(CompareDislikes);
	}
	else
	{
		komentari.sort(CompareDislikes2);
	}
	document.getElementById("komentar").innerHTML = "";
	komentari.forEach(element => {
		if(element.value.hide==0||element.value.hide==undefined)
		{
			document.getElementById("komentar").innerHTML += "<div id=\"a"+element.index+"\"><a>Title: " + element.value.title + "</a><input type=\"button\" id=\"absol\" value=\"Hide\" onclick=\"Sakri("+element.index+")\"><p>Text: " + element.value.komentar + "</p><a><font color=\"green\">" + element.value.likes + "</font><input type=\"image\" src=\"./slike/upvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"LikeKomentar(" + element.index + ")\"></a><a><font color=\"red\">" + element.value.dislikes + "</font><input type=\"image\" src=\"./slike/downvote.png\" width=\"40vw\" height=\"40vw\" onclick=\"DislikeKomentar(" + element.index + ")\"></a></div>";
		}
		else
		{
			document.getElementById("komentar").innerHTML += "<div id=\"a"+element.index+"\"><a>Comment hidden!</a><input type=\"button\" id=\"absol\" value=\"Unhide\" onclick=\"Odsakri("+element.index+")\"></div>";
		}
		$("#a"+element.index).css("background-color", getRandomColor());
		$("#a"+element.index).css("position", "relative");
	});
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function CompareLikeDislike(x, y) {
	if(x.value.hide==1)
	{
		return 1;
	}
	if(y.value.hide==1)
	{
		return -1;
	}
	if(x.value.dislikes==0&&y.value.dislikes==0)
	{
		return CompareLikes(x,y);
	}
	if(x.value.dislikes==0)
	{
		return -1;
	}
	if(y.value.dislikes==0)
	{
		return 1;
	}
	if((x.value.likes/x.value.dislikes) >= (y.value.likes/y.value.dislikes)) {
		return -1;
	}
	return 1;
}

function CompareLikeDislike2(x, y) {
	if(x.value.hide==1)
	{
		return 1;
	}
	if(y.value.hide==1)
	{
		return -1;
	}
	if(x.value.dislikes==0&&y.value.dislikes==0)
	{
		return CompareLikes2(x,y);
	}
	if(x.value.dislikes==0)
	{
		return 1;
	}
	if(y.value.dislikes==0)
	{
		return -1;
	}
	if((x.value.likes/x.value.dislikes) <= (y.value.likes/y.value.dislikes)) {
		return -1;
	}
	return 1;
}

function CompareLikes(x, y) {
	if(x.value.hide==1)
	{
		return 1;
	}
	if(y.value.hide==1)
	{
		return -1;
	}
	if(x.value.likes >= y.value.likes) {
		return -1;
	}
	return 1;
}

function CompareDislikes(x, y) {
	if(x.value.hide==1)
	{
		return 1;
	}
	if(y.value.hide==1)
	{
		return -1;
	}
	if(x.value.dislikes >= y.value.dislikes) {
		return -1;
	}
	return 1;
}
function CompareLikes2(x, y) {
	if(x.value.hide==1)
	{
		return 1;
	}
	if(y.value.hide==1)
	{
		return -1;
	}
	if(x.value.likes <= y.value.likes) {
		return -1;
	}
	return 1;
}

function CompareDislikes2(x, y) {
	if(x.value.hide==1)
	{
		return 1;
	}
	if(y.value.hide==1)
	{
		return -1;
	}
	if(x.value.dislikes <= y.value.dislikes) {
		return -1;
	}
	return 1;
}

function CompareOcene(x, y) {
	if(x.ocena >= y.ocena) {
		return -1;
	}
	return 1;
}

function CompareOcene2(x, y) {
	if(x.ocena <= y.ocena) {
		return -1;
	}
	return 1;
}