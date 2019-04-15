var profs=[];
function homepage(){
	$("window").ready(() => {
        fetch('http://localhost:3000/profdb',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response =>response.json())
        .then(json => {
            json.forEach(element => {
                profs.push(element);
            });
            var i = 0;
            profs.forEach(element => {
                window.sessionStorage.setItem('storage' + i, JSON.stringify(element));
                document.getElementById('lista_profesora').innerHTML +=
                "<div class=\"col-sm-4 md-4\"><a href=\"./template.html?" + i + "\"><img src=./" + element.slika + " id=\"slika\" class=\"img-responsive\"></a></div>";
                i++;
            });
        })
        .catch(err => {
            window.alert('Error! \n' + err.message);
        });
    });
}
function Add(){
	document.getElementById("edit").innerHTML = "<p>Dodaj Profesora:</p><textarea rows=\"10\" style=\"width:100%\" id = \"prof2\"></textarea><input type=\"button\" value=\"Dodaj\" onclick=\"Dodaj()\"><br><br>";
}
function Dodaj(){
	let body1 = document.getElementById('prof2').value;
	fetch('http://localhost:3000/profdb',{
			body:body1,
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
    })
	.then(response =>response.json())
    .then(json => {
		window.location.reload();
	})
    .catch(err => {
        window.alert('Error! \n' + err.message);
    });
}
function DelEverything(){
	$("window").ready(() => {
        fetch('http://localhost:3000/profdb',{
			body:"{}",
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
		.then(response =>response.json())
        .then(json => {
			window.location.reload();
		})
        .catch(err => {
            window.alert('Error! \n' + err.message);
        });
    });
}