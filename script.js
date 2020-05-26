
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function preventDefault(pilot, copilot, fuel, cargo) {
	

	event.preventDefault();
	let test = true;

	if( pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === "") {
				
		alert("All fields are required!");
		event.preventDefault();
		test = false;
	}
	
	if ( !isNaN(pilot.value) || !isNaN(copilot.value) || isNaN(fuel.value) || isNaN(cargo.value)){
		alert("Make sure to enter valid information for each field!");
		test = false;
	}
	
	return test;

}

function shuttleStatus(pilot, copilot, fuel, cargo) {

	let status = document.getElementById("faultyItems");
	let pilotStatus = document.getElementById("pilotStatus");
	let copilotStatus = document.getElementById("copilotStatus");
	let fuelStatus = document.getElementById("fuelStatus");
	let cargoStatus = document.getElementById("cargoStatus");
	let launchStatus = document.getElementById("launchStatus"); 
	let test = true;
	
	pilotStatus.innerHTML =  `Pilot ${pilot.value} is ready for launch`;
	copilotStatus.innerHTML =  `Co-pilot ${copilot.value} is ready for launch`;
	
	//creating default setting
	launchStatus.innerHTML = "Shuttle is ready for launch";
	launchStatus.style.color = "green";	
	fuelStatus.innerHTML = "Fuel level high enough for launch";
	cargoStatus.innerHTML = "Cargo mass low enough for launch";
	status.style.visibility = "hidden" ;
	
	
	if ( fuel.value < 10000) {
		
		fuelStatus.innerHTML = "Fuel level too low for launch";
		launchStatus.innerHTML = "Shuttle not ready for launch";
		launchStatus.style.color = "red";	
		status.style.visibility = "visible" ;	
		test = false;
	}
	
	if ( cargo.value > 10000) {
		
		cargoStatus.innerHTML = "Cargo level too high for launch";
		launchStatus.innerHTML = "Shuttle not ready for launch";
		launchStatus.style.color = "red";	
		status.style.visibility = "visible" ;	
		test = false;
	}	
	
	return test;
}

function planetData() {

	let json = [];
	let missionTarget = document.getElementById("missionTarget");
	
	
			
	fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
			
		response.json().then(function(json) {
			
			let random = Math.floor(Math.random() * json.length);
			missionTarget.innerHTML = `
				<h2>Mission Destination</h2>
					<ol>
						<li>Name: ${json[random].name}</li>
						<li>Diameter: ${json[random].diameter}</li>
						<li>Star: ${json[random].star}</li>
						<li>Distance from Earth: ${json[random].distance}</li>
						<li>Number of Moons: ${json[random].moons}</li>
					</ol>
					<img src="${json[random].image}">
				`;			
		});


	});
}

window.addEventListener("load", function() {
	
	//form
	let form = document.querySelector("form");
	
	//inputs
	let pilotName = document.querySelector("input[name=pilotName]");
	let copilotName = document.querySelector("input[name=copilotName]");
	let fuelLevel = document.querySelector("input[name=fuelLevel]");
	let cargoMass = document.querySelector("input[name=cargoMass]");
	
			
	form.addEventListener("submit", function(event) {
				
		if ( preventDefault(pilotName, copilotName, fuelLevel, cargoMass) && shuttleStatus(pilotName, copilotName, fuelLevel, cargoMass)) {		
			planetData();
		}
		
	});
});
	