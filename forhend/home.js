var path='http://localhost:3000/db/';
function home(way){
	$("window").ready(() => {
        var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
		console.log(index);
		addKorisnik(way);
		if(index>0)
			addMenadzer();
		if(index>1)
			addAdministrator();
    });
}
function back(){
	window.location.replace("./userselect.html");
}
function addKorisnik(way)
{
	fetch(path+'stanica',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.then(response=>response.json())
	.then(json=>{
		document.getElementById("tabela").innerHTML="<tr><th>Naziv:</th><th>Lokacija:</th><th>Stanica po redu:</th><th>Linija:</th></tr>";
		if(way==0)
			json.sort(compareStanice);
		else
			json.sort(compareStanice2);
		json.forEach(element=>{
			document.getElementById("tabela").innerHTML+="<tr>"+"<td>"+element.naziv+"</td>"+"<td>"+element.lokacija+"</td>"+"<td>"+element.stanica_po_redu+"</td>"+"<td>"+element.linija+"</td></tr>";
		});
	})
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function compareStanice2(x,y){
	if(x.linija<y.linija)
		return 1;
	if(x.linija>y.linija)
		return -1;
	if(x.stanica_po_redu<y.stanica_po_redu)
		return 1;
	if(x.stanica_po_redu>y.stanica_po_redu)
		return -1;
	return -1;
}
function compareStanice(x,y){
	if(x.linija<y.linija)
		return -1;
	if(x.linija>y.linija)
		return 1;
	if(x.stanica_po_redu<y.stanica_po_redu)
		return -1;
	if(x.stanica_po_redu>y.stanica_po_redu)
		return 1;
	return 1;
}
function addMenadzer()
{
	document.getElementById("azuriranje").innerHTML+="<p>Azuriraj tabele</p>";
	document.getElementById("azuriranje").innerHTML+="<input type=\"button\" value=\"Vozac\" onclick=\"azuriraj(0)\">&nbsp;";
}
function addAdministrator()
{
	document.getElementById("azuriranje").innerHTML+="<input type=\"button\" value=\"Autobus\" onclick=\"azuriraj(3)\">&nbsp;";
	document.getElementById("azuriranje").innerHTML+="<input type=\"button\" value=\"Linija\" onclick=\"azuriraj(6)\">&nbsp;";
	document.getElementById("azuriranje").innerHTML+="<input type=\"button\" value=\"Stanica\" onclick=\"azuriraj(9)\">&nbsp;";
	document.getElementById("azuriranje").innerHTML+="<input type=\"button\" value=\"Udaljenost\" onclick=\"azuriraj(12)\">&nbsp;";
}
function azuriraj(i)
{
	window.location.replace("./update.html?"+i);
}

function getNextBus()
{
	var text='{"linija":'+document.getElementById("linija").value+',"vreme":"'+document.getElementById("vreme").value+'","stanica_po_redu":'+document.getElementById("stanica_po_redu").value+'}';
	fetch(path+'nextbus',{
			body:text,
            method: 'PUT',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.then(response=>response.json())
	.then(json=>{
		if(json=='-1')
			document.getElementById("bus").innerHTML='Nazalost nema autobusa za zadate parametre';
		else
			document.getElementById("bus").innerHTML='Sledeci autobus dolazi u:'+json;
	})
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function convertTimeToInt(po)
{
	po=po.split(':');
	po=(+po[0])*60*60+(+po[1])*60+(+po[2]);
	return po;
}
function comparePath(a,b)
{
	var aa=+convertTimeToInt(a.vreme)+ +a.duzina;
	var bb=+convertTimeToInt(b.vreme)+ +b.duzina;
	if(aa==bb)
	{
		if(a.linija<=b.linija)
			return -1;
		return 1;
	}
	if(aa<bb)
		return -1;
	return 1;
}
function getPath()
{
	var text='{"stanica1":"'+document.getElementById("stanica1").value+'","stanica2":"'+document.getElementById("stanica2").value+'","vreme":"'+document.getElementById("vreme2").value+'"}';
	console.log(text);
	fetch(path+'findpath',{
		body:text,
		method: 'PUT',
		mode: 'cors',
		headers: {
                'content-type': 'application/json'
            }
	})
	.then(response=>response.json())
	.then(json=>{
		json=JSON.parse(json);
		if(json.length==0)
			document.getElementById("path").innerHTML='Nazalost nema autobusa za zadate parametre';
		else
		{
			document.getElementById("path").innerHTML="<tr><th>Vreme dolaska:</th><th>Linija:</th><th>Duzina puta:</th></tr>";
			json.sort(comparePath);
			console.log(json);
			for(var i=0;i<json.length;i++){
				if(json[i]=='')
					continue;
				document.getElementById("path").innerHTML+="<tr>"+"<td>"+json[i].vreme+"</td>"+"<td>"+json[i].linija+"</td>"+"<td>"+json[i].duzina+"</td></tr>";
			}
		}
	})
	.catch(err=>{
		window.alert('Error! \n'+err.message);
	});
			
}

