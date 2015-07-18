function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
 
   xhr.onreadystatechange = function () 
   { 
	   
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
		  document.getElementById("output").innerHTML = "";
		  for(i=0; i< json.results.length; i++)
		  {
			var x = json.results[i].id;
			var y = json.results[i].release_date;
			var z = json.results[i].title;
			document.getElementById("output").innerHTML += "<tr> <td> <a onclick = \"getDetails("+x+");\"> " + z + "</a> </td> <td> " + y + " </td> </tr> ";
		  }	  
		 // var str = JSON.stringify(json,undefined,2);
         // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
       }
   };
		xhr.send(null);
   }

function getDetails (id) {
	var xhr = new XMLHttpRequest();
	var xhr1 = new XMLHttpRequest();
	xhr.open("GET", "proxy.php?method=/3/movie/" + id);
	xhr1.open("GET", "proxy.php?method=/3/movie/" + id + "/credits");
	xhr.setRequestHeader("Accept","application/json");
	xhr1.setRequestHeader("Accept","application/json");
 
	document.getElementById("output1").innerHTML = id;
 
	xhr.onreadystatechange = function () 
	{	   
       if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			var y = json.poster_path;
			var z = json.original_title;
			var m = "";
			for(j=0;j<json.genres.length - 1;j++)
			{				
				m += json.genres[j].name + ",";
			}
			m += json.genres[json.genres.length-1].name ;
			var n = json.overview;
			document.getElementById("output1").innerHTML = "<tr> <td> " + z + "</td> <td> <img src= http://image.tmdb.org/t/p/w185/" + y + " </img> </td> <td> " + m + " </td> <td> " + n + " </td> ";
			
       }
	};
	xhr.send(null);
	
	xhr1.onreadystatechange = function () 
	{	  
		document.getElementById("output2").innerHTML = "";
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
		  for(i=0; i<= 4; i++)
		  {
			var a = json.cast[i].name;
			document.getElementById("output2").innerHTML += "<td>" + a + "</td> ";
		  }
		document.getElementById("output2").innerHTML += "</tr>";
       }
   };
   xhr1.send(null);
	
  } 
