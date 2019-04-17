var path='http://localhost:3000/db/';
function home(){
	$("window").ready(() => {
        var index = window.location.href.substring(window.location.href.indexOf('?') + 1);
		console.log(index);
		addKorisnik();
		if(index>0)
			addMenadzer();
		if(index>1)
			addAdministrator();
    });
}
function back(){
	window.location.replace("./userselect.html");
}
function addKorisnik()
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
		json.sort(compareStanice);
		json.forEach(element=>{
			document.getElementById("tabela").innerHTML+="<tr>"+"<td>"+element.naziv+"</td>"+"<td>"+element.lokacija+"</td>"+"<td>"+element.stanica_po_redu+"</td>"+"<td>"+element.linija+"</td></tr>";
		});
	})
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
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
		document.getElementById("bus").innerHTML="<tr><th>Naziv:</th><th>Lokacija:</th><th>Stanica po redu:</th><th>Linija:</th></tr>";
		json.sort(compareStanice);
		json.forEach(element=>{
			document.getElementById("bus").innerHTML+="<tr>"+"<td>"+element.naziv+"</td>"+"<td>"+element.lokacija+"</td>"+"<td>"+element.stanica_po_redu+"</td>"+"<td>"+element.linija+"</td></tr>";
		});
	})
	.catch(err => {
        window.alert('Error! \n' + err.message);
    });
}

