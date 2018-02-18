$(document).ready(function() {

	// Initialized and current resources
	var dirt = 100000;
	var wood = 10000;
	var stone = 10000;
	var metal = 10000;
	var students = 10000;

	var player_stats = {
		dirt_per_click: 1,
		wood_per_click: 1,
		stone_per_click: 1,
		metal_per_click: 1,
		passive_dirt: 0,
		passive_wood: 0,
		passive_stone: 0,
		passive_metal: 0,
		purchased_passives: {
			workers: 0,
			vehicles: 0,
			slaves: 0,
			forester: 0,
			rock_quarry: 0,
			ore_quarry: 0
		},
		purchased_upgrades: {
			buckets: 0, 
			shovels: 0, 
			trucks: 0,
			excavator: 0,
			backhoe: 0,
			axe: 0,
			hacksaw: 0,
			chainsaw: 0,
			pickaxe: 0,
			sledgehammer: 0,
			dynamite: 0,
			drill: 0,
			minecart: 0,
			extractor: 0,
		},
		purchased_buildings:{
			dormitory: 0,
			MBC: 0,
			blusson: 0,
			SSC: 0,
			library: 0,
			SUB: 0,
			saywell: 0,
			ASB: 0,
			WMC: 0
		},
		dirt_mound_level: {
			"0": 1,
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0,
			"5": 0
		}
	}

	var upgrade_costs = {
		workers: {
			dirt: 100,
			wood: 0,
			stone: 0,
			metal: 0
		},
		vehicles: {
			dirt: 1000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		slaves: {
			dirt: 250,
			wood: 0,
			stone: 0,
			metal: 0
		},
		forester: {
			dirt: 25000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		rock_quarry: {
			dirt: 15000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		ore_quarry: {
			dirt: 50000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		buckets: {
			dirt: 10,
			wood: 0,
			stone: 0,
			metal: 0
		},
		shovels: {
			dirt: 100,
			wood: 0,
			stone: 0,
			metal: 0
		},
		trucks: {
			dirt: 1000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		excavator: {
			dirt: 10000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		backhoe: {
			dirt: 100000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		axe: {
			dirt: 0,
			wood: 15,
			stone: 0,
			metal: 1
		},
		hacksaw: {
			dirt: 0,
			wood: 0,
			stone: 0,
			metal: 50
		},
		chainsaw: {
			dirt: 0,
			wood: 0,
			stone: 0,
			metal: 300
		},
		pickaxe: {
			dirt: 0,
			wood: 30,
			stone: 0,
			metal: 5
		},
		sledgehammer: {
			dirt: 0,
			wood: 150,
			stone: 0,
			metal: 10
		},
		dynamite: {
			dirt: 5000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		drill: {
			dirt: 0,
			wood: 0,
			stone: 0,
			metal: 60
		},
		minecart: {
			dirt: 0,
			wood: 0,
			stone: 0,
			metal: 1500
		},
		extractor: {
			dirt: 0,
			wood: 0,
			stone: 0,
			metal: 5000
		},
		students: {
			dirt: 1000,
			wood: 0,
			stone: 0,
			metal: 0
		},
		dormitory: {
			dirt: 0,
			wood: 10000,
			stone: 10000,
			metal: 100
		},
		MBC: {
			dirt: 0,
			wood: 0,
			stone: 20000,
			metal: 15000
		},
		blusson: {
			dirt: 0,
			wood: 17500,
			stone: 22500,
			metal: 100
		},
		SSC: {
			dirt: 0,
			wood: 20000,
			stone: 25000,
			metal: 100
		},
		library: {
			dirt: 0,
			wood: 20000,
			stone: 30000,
			metal: 100
		},
		SUB: {
			dirt: 0,
			wood: 30000,
			stone: 40000,
			metal: 100
		},
		saywell: {
			dirt: 0,
			wood: 45000,
			stone: 60000,
			metal: 100
		},
		ASB: {
			dirt: 0,
			wood: 60000,
			stone: 80000,
			metal: 100
		},
		WMC: {
			dirt: 0,
			wood: 75000,
			stone: 100000,
			metal: 100
		}
	}


	var game_update_frequency = 500; //Milliseconds


	/**************************************

			Lightbox

	***************************************/
	$("#overlay").click(function() {
		modal_off();
	});
	/**************************************

			End Lightbox

	***************************************/


	/**************************************

			Saving & Loading

	***************************************/

	function save_game() {
		var save_file = {
			dirt: dirt,
			wood: wood,
			stone: stone,
			metal: metal,
			students: students,
			player_statistics: player_stats,
			upgrade_costs: upgrade_costs,
		}
		localStorage.setItem("save",JSON.stringify(save_file));
	}

	$("#save").click(function(){
		save_game();
	});

	$("#load").click(function(){
		var load_file = JSON.parse(localStorage.getItem("save"));
		if (typeof load_file !== "undefined") {
			dirt = load_file.dirt;
			wood = load_file.wood;
			stone = load_file.stone;
			metal = load_file.metal;
			students = load_file.students;
			player_stats = load_file.player_statistics;
			upgrade_costs = load_file.upgrade_costs;
		}
		update_resources();
	});

	/**************************************

			End Saving & Loading

	***************************************/

	/**************************************

		    Passive Upgrade Section

	***************************************/

	// Workers upgrade button
	$(".workers-passive").click(function() {
		if (resource_purchase_check("workers")) {
			resource_purchase_update("workers"); // Take away the resources to purchase the tool
			player_stats.passive_dirt += 1; // Increase passive amount
			player_stats.purchased_passives["workers"] += 1;
			cost_increase("workers"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	// vehicles upgrade button
	$(".vehicles-passive").click(function() {
		if (resource_purchase_check("vehicles")) {
			resource_purchase_update("vehicles"); // Take away the resources to purchase the tool
			player_stats.passive_dirt += 5; // Increase passive amount
			player_stats.purchased_passives["vehicles"] += 1;
			cost_increase("vehicles"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	// dirt_slaves upgrade button
	$(".slaves-passive").click(function() {
		if (resource_purchase_check("slaves")) {
			resource_purchase_update("slaves"); // Take away the resources to purchase the tool
			player_stats.passive_dirt += 1; // Increase passive amount
			player_stats.purchased_passives["slaves"] += 1;
			cost_increase("slaves"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	// collect_wood upgrade button
	$(".forester-passive").click(function() {
		if (resource_purchase_check("forester")) {
			resource_purchase_update("forester"); // Take away the resources to purchase the tool
			player_stats.passive_wood += 100; // Increase passive amount
			player_stats.purchased_passives["forester"] += 1;
			cost_increase("forester"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	// collect_stone upgrade button
	$(".rock_quarry-passive").click(function() {
		if (resource_purchase_check("rock_quarry")) {
			resource_purchase_update("rock_quarry"); // Take away the resources to purchase the tool
			player_stats.passive_stone += 100; // Increase passive amount
			player_stats.purchased_passives["rock_quarry"] += 1;
			cost_increase("rock_quarry"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	//collect_metal upgrade button
	$(".ore_quarry-passive").click(function() {
		if (resource_purchase_check("ore_quarry")) {
			resource_purchase_update("ore_quarry"); // Take away the resources to purchase the tool
			player_stats.passive_metal += 100; // Increase passive amount
			player_stats.purchased_passives["ore_quarry"] += 1;
			cost_increase("ore_quarry"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	/**************************************

		    End Passive Upgrade Section

	***************************************/

	// Play area clicking
	$("#play-area").click(function() {
		resource_change(player_stats.dirt_per_click, 0, 0, 0, 0);
		update_resources();
	});

	$("#f-stone").click(function() {
		resource_change(-1, 0,player_stats.stone_per_click,0,0);
		update_resources();
	})

	$("#f-wood").click(function() {
		resource_change(-1, player_stats.wood_per_click,0,0,0);
		update_resources();
	})

	$("#f-metal").click(function() {
		resource_change(-1, 0,0,player_stats.metal_per_click,0);
		update_resources();
	})

	/**************************************

		    Active Upgrade Section
		    
	***************************************/

	$(".buckets-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("buckets")) {
			resource_purchase_update("buckets"); // Take away the resources to purchase the tool
			player_stats.dirt_per_click += 1; // Increase click amount
			player_stats.purchased_upgrades["buckets"] += 1;
			cost_increase("buckets"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".shovels-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("shovels")) {
			resource_purchase_update("shovels"); // Take away the resources to purchase the tool
			player_stats.dirt_per_click += 5; // Increase click amount
			player_stats.purchased_upgrades["shovels"] += 1;
			cost_increase("shovels"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".trucks-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("trucks")) {
			resource_purchase_update("trucks"); // Take away the resources to purchase the tool
			player_stats.dirt_per_click += 25; // Increase click amount
			player_stats.purchased_upgrades["trucks"] += 1;
			cost_increase("trucks"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".excavators-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("excavator")) {
			resource_purchase_update("excavator"); // Take away the resources to purchase the tool
			player_stats.dirt_per_click += 50; // Increase click amount
			player_stats.purchased_upgrades["excavator"] += 1;
			cost_increase("excavator"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".backhoes-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("backhoe")) {
			resource_purchase_update("backhoe"); // Take away the resources to purchase the tool
			player_stats.dirt_per_click += 100; // Increase click amount
			player_stats.purchased_upgrades["backhoe"] += 1;
			cost_increase("backhoe"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".axes-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("axe")) {
			resource_purchase_update("axe"); // Take away the resources to purchase the tool
			player_stats.wood_per_click += 1; // Increase click amount
			player_stats.purchased_upgrades["axe"] += 1;
			cost_increase("axe"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".hacksaws-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("hacksaw")) {
			resource_purchase_update("hacksaw"); // Take away the resources to purchase the tool
			player_stats.wood_per_click += 5; // Increase click amount
			player_stats.purchased_upgrades["hacksaw"] += 1;
			cost_increase("hacksaw"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".chainsaws-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("chainsaw")) {
			resource_purchase_update("chainsaw"); // Take away the resources to purchase the tool
			player_stats.wood_per_click += 15; // Increase click amount
			player_stats.purchased_upgrades["chainsaw"] += 1;
			cost_increase("chainsaw"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".pickaxes-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("pickaxe")) {
			resource_purchase_update("pickaxe"); // Take away the resources to purchase the tool
			player_stats.stone_per_click += 1; // Increase click amount
			player_stats.purchased_upgrades["pickaxe"] += 1;
			cost_increase("pickaxe"); // Increase cost
			update_resources(); // Update resources immediately
			console.log("Pickaxe bought!");
		}
	});

	$(".sledgehammers-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("sledgehammer")) {
			resource_purchase_update("sledgehammer"); // Take away the resources to purchase the tool
			player_stats.stone_per_click += 5; // Increase click amount
			player_stats.purchased_upgrades["sledgehammer"] += 1;
			cost_increase("sledgehammer"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".dynamites-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("dynamite")) {
			resource_purchase_update("dynamite"); // Take away the resources to purchase the tool
			player_stats.stone_per_click += 25; // Increase click amount
			player_stats.purchased_upgrades["dynamite"] += 1;
			cost_increase("dynamite"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".drills-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("drill")) {
			resource_purchase_update("drill"); // Take away the resources to purchase the tool
			player_stats.metal_per_click += 3; // Increase click amount
			player_stats.purchased_upgrades["drill"] += 1;
			cost_increase("drill"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".minecarts-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("minecart")) {
			resource_purchase_update("minecart"); // Take away the resources to purchase the tool
			player_stats.metal_per_click += 15; // Increase click amount
			player_stats.purchased_upgrades["minecart"] += 1;
			cost_increase("minecart"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".extractors-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("extractor")) {
			resource_purchase_update("extractor"); // Take away the resources to purchase the tool
			player_stats.metal_per_click += 50; // Increase click amount
			player_stats.purchased_upgrades["extractor"] += 1;
			cost_increase("extractor"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	$(".students-purchase").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("students")) {
			resource_purchase_update("students"); // Take away the resources to purchase the tool
			students += 1;
			update_resources(); // Update resources immediately
		}
	});

	/**************************************

		    End Active Upgrade Section
		    
	***************************************/


	/**************************************

		    Building Upgrade Section
		    
	***************************************/

	$(".dormitory-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("dormitory") && player_stats.purchased_buildings.dormitory == 0 ) {
			resource_purchase_update("dormitory"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.dormitory = 1;
			$(".dormitory-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".MBC-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("MBC") && player_stats.purchased_buildings.MBC == 0 ) {
			resource_purchase_update("MBC"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.MBC = 1;
			$(".MBC-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".blusson-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("blusson") && player_stats.purchased_buildings.blusson == 0 ) {
			resource_purchase_update("blusson"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.blusson = 1;
			$(".blusson-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".SSC-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("SSC") && player_stats.purchased_buildings.SSC == 0 ) {
			resource_purchase_update("SSC"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.SSC = 1;
			$(".SSC-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".library-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("library") && player_stats.purchased_buildings.library == 0 ) {
			resource_purchase_update("library"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.library = 1;
			$(".library-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".SUB-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("SUB") && player_stats.purchased_buildings.SUB == 0 ) {
			resource_purchase_update("SUB"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.SUB = 1;
			$(".SUB-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".saywell-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("saywell") && player_stats.purchased_buildings.saywell == 0 ) {
			resource_purchase_update("saywell"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.saywell = 1;
			$(".saywell-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".ASB-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("ASB") && player_stats.purchased_buildings.ASB == 0 ) {
			resource_purchase_update("ASB"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.ASB = 1;
			$(".ASB-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	$(".WMC-upgrade").click(function () {
		// Check to see if the player has enough resources to purchase the tool
		if (resource_purchase_check("WMC") && player_stats.purchased_buildings.WMC == 0 ) {
			resource_purchase_update("WMC"); // Take away the resources to purchase the tool
			player_stats.purchased_buildings.WMC = 1;
			$(".WMC-upgrade").addClass("not-allowed"); // Disable selection vvisual effects
			update_resources(); // Update resources immediately
		}
	});

	/**************************************

		    End Building Upgrade Section
		    
	***************************************/

	/**************************************

		    Raid Section
		    
	***************************************/
	$(".uni-raid").click(function() {
		
		num = Math.round(Math.random());
		if (students >= 100 && num ==1) {
			resource_change(0,0,0,0,50);
		} else {
			resource_change(0,0,0,0,-100);
		}
	});

	$(".it-raid").click(function() {
		//Math.floor(Math.random() * (high - low + 1) + low);
		num = Math.floor(Math.random() * (4 - 1 + 1) + 1);
		console.log(num);
		if (students >= 100) {
			switch(num) {
				case 1:
					resource_change(100000,0,0,0,0);
				case 2:
					resource_change(0,100000,0,0,0);
				case 3:
					resource_change(0,0,100000,0,0);
				case 4:
					resource_change(0,0,0,100000,0);
			}
			resource_change(0,0,0,0,-100);
		} 
	});

	$(".col-raid").click(function() {
		
		num = Math.round(Math.random());
		if (students >= 100 && num ==1) {
			resource_change(150000,0,0,0,0);
		} else {
			resource_change(0,0,0,0,-100);
		}
	});

	/**************************************

		    End Raid Section
		    
	***************************************/

	/**************************************

			Main Game Loop
		    
	***************************************/

	setInterval(function(){ 
		resource_change(player_stats.passive_dirt,player_stats.passive_wood,player_stats.passive_stone,player_stats.passive_metal,0);
		update_resources();
	}, game_update_frequency);

	/**************************************

			End Main Game Loop
		    
	***************************************/

	/**************************************

			Helper Functions
		    
	***************************************/

	// Function to toggle off intro
	function modal_off() {
		$("#overlay").addClass("hidden");
	}

	// Functions for adding resources
	function resource_change(dirt_change, wood_change, stone_change, metal_change, students_change) {
		dirt += dirt_change; // Makes changes to the dirt total
		wood += wood_change; // Makes changes to the wood total
		stone += stone_change; // Makes changes to the stone total
		metal += metal_change; // Makes changes to the metal total
		students += students_change; // Makes changes to the students total
	}

	// Function for updating resources to scoreboard
	function update_resources() {
		$(".dirt-amount").html("Dirt: " + dirt); // Displays total amount of Dirt
		$(".wood-amount").html("Wood: " + wood); // Displays total amount of Wood
		$(".stone-amount").html("Stone: " + stone); // Displays total amount of Stone
		$(".metal-amount").html("Metal: " + metal); // Displays total amount of Metal
		$(".student-amount").html("Students: " + students); // Displays total amount of Students

		$(".passive-dirt").html("Dirt: " + player_stats.passive_dirt); // Displays passive dirt generation
		$(".passive-wood").html("Wood: " + player_stats.passive_wood); // Displays passive wood generation
		$(".passive-stone").html("Stone: " + player_stats.passive_stone); // Displays passive stone generation
		$(".passive-metal").html("Metal: " + player_stats.passive_metal); // Displays passive metal generation

		//update passive levels
		$("#workers").html("Workers Lv." + player_stats.purchased_passives.workers);
		$("#workers-dirt").html("Cost: " + upgrade_costs.workers.dirt + " Dirt");
		$("#vehicles").html("Vehicles Lv." + player_stats.purchased_passives.vehicles);
		$("#vehicles-dirt").html("Cost: " + upgrade_costs.vehicles.dirt + " Dirt");
		$("#slaves").html("Slaves Lv." + player_stats.purchased_passives.slaves);
		$("#slaves-dirt").html("Cost: " + upgrade_costs.slaves.dirt + " Dirt");
		$("#forester").html("Forester Lv." + player_stats.purchased_passives.forester);
		$("#forester-dirt").html("Cost: " + upgrade_costs.forester.dirt + " Dirt");
		$("#rock_quarry").html("Rock Quarry Lv." + player_stats.purchased_passives.rock_quarry);
		$("#rock_quarry-dirt").html("Cost: " + upgrade_costs.rock_quarry.dirt + " Dirt");
		$("#ore_quarry").html("Ore Quarry Lv." + player_stats.purchased_passives.ore_quarry);
		$("#ore_quarry-dirt").html("Cost: " + upgrade_costs.ore_quarry.dirt + " Dirt");

		$(".upgrade-bucket").html("Bucket Upgrade (Level " + player_stats.purchased_upgrades.buckets + ")");
		$("#bucket-dirt").html("Cost: " + upgrade_costs.buckets.dirt + " Dirt");
		$(".upgrade-shovel").html("Shovel Upgrade (Level " + player_stats.purchased_upgrades.shovels +")");
		$("#shovel-dirt").html("Cost: " + upgrade_costs.shovels.dirt + " Dirt");
		$(".upgrade-truck").html("Truck Upgrade (Level " + player_stats.purchased_upgrades.trucks +")");
		$("#truck-dirt").html("Cost: " + upgrade_costs.trucks.dirt + " Dirt");
		$(".upgrade-excavator").html("Excavator Upgrade (Level " + player_stats.purchased_upgrades.excavator +")");
		$("#excavator-dirt").html("Cost: " + upgrade_costs.excavator.dirt + " Dirt");
		$(".upgrade-backhoe").html("Backhoe Upgrade (Level " + player_stats.purchased_upgrades.backhoe +")");
		$("#backhoe-dirt").html("Cost: " + upgrade_costs.backhoe.dirt + " Dirt");
		$(".upgrade-axe").html("Axe Upgrade (Level " + player_stats.purchased_upgrades.axe +")");
		$("#axe-dirt").html("Cost: " + upgrade_costs.axe.metal + " Metal and " + upgrade_costs.axe.wood + " Wood");
		$(".upgrade-hacksaw").html("Hacksaw Upgrade (Level " + player_stats.purchased_upgrades.hacksaw +")");
		$("#hacksaw-dirt").html("Cost: " + upgrade_costs.hacksaw.metal + " Metal");

		$(".upgrade-chainsaw").html("Chainsaw Upgrade (Level " + player_stats.purchased_upgrades.chainsaw +")");
		$(".chainsaw-dirt").html("Cost: " + upgrade_costs.chainsaw.metal + " Metal");
		$(".upgrade-pickaxes").html("Pickaxe Upgrade (Level " + player_stats.purchased_upgrades.pickaxe +")");
		$(".pickaxes-dirt").html("Cost: " + upgrade_costs.pickaxe.wood + " Wood and " + upgrade_costs.drill.metal + " Metal");
		$(".upgrade-sledgehammers").html("Sledgehammer Upgrade (Level " + player_stats.purchased_upgrades.sledgehammer +")");
		$(".sledgehammer-dirt").html("Cost: " + upgrade_costs.sledgehammer.wood + " Wood and " + upgrade_costs.sledgehammer.metal + " Metal");
		$(".upgrade-dynamite").html("Dynamite Upgrade (Level " + player_stats.purchased_upgrades.dynamite +")");
		$(".dynamite-dirt").html("Cost: " + upgrade_costs.dynamite.dirt + " Dirt");
		$(".upgrade-drills").html("Drill Upgrade (Level " + player_stats.purchased_upgrades.drill +")");
		$(".drills-dirt").html("Cost: " + upgrade_costs.drill.metal + " Metal");
		$(".upgrade-minecarts").html("Minecart Upgrade (Level " + player_stats.purchased_upgrades.minecart +")");
		$(".minecarts-dirt").html("Cost: " + upgrade_costs.minecart.metal + " Metal");
		$(".upgrade-extractors").html("Extractor Upgrade (Level " + player_stats.purchased_upgrades.extractor +")");
		$(".extractors-dirt").html("Cost: " + upgrade_costs.extractor.metal + " Metal");
		$(".upgrade-students").html("Students Upgrade (Level " + students +")");
		$(".students-dirt").html("Cost: " + upgrade_costs.students.dirt + " Dirt");

		check_visuals();
		display_visuals();
		// console.log("updating scoreboard");
	}


	// Function for checking to see if the player has enough resources to purchase active upgrades
	function resource_purchase_check(upgrade_name) {
		if (dirt >= upgrade_costs[upgrade_name].dirt &&
			wood >= upgrade_costs[upgrade_name].wood &&
			stone >= upgrade_costs[upgrade_name].stone &&
			metal >= upgrade_costs[upgrade_name].metal ) {
			console.log("Enough resources");
			return true;
		}
		console.log("Not enough resources");
		return false;
	}

	// Function for purchasing tools
	function resource_purchase_update(upgrade_name) {
		resource_change(-upgrade_costs[upgrade_name].dirt, -upgrade_costs[upgrade_name].wood, -upgrade_costs[upgrade_name].stone, -upgrade_costs[upgrade_name].metal, 0)
	}

	// Function for cost increases
	function cost_increase(upgrade_name) {
		upgrade_costs[upgrade_name].dirt = Math.ceil(Math.pow(upgrade_costs[upgrade_name].dirt, 1.1));
		upgrade_costs[upgrade_name].wood = Math.ceil(Math.pow(upgrade_costs[upgrade_name].wood, 1.1));
		upgrade_costs[upgrade_name].stone = Math.ceil(Math.pow(upgrade_costs[upgrade_name].stone , 1.1));
		upgrade_costs[upgrade_name].metal = Math.ceil(Math.pow(upgrade_costs[upgrade_name].metal , 1.1));
	}

	// Function to check for visual effects
	function check_visuals() {
		// Set switches for dirt mound heights
		if (dirt >= 1000000) {
			player_stats.dirt_mound_level["5"] = 1;
		} else if (dirt >= 100000) {
			player_stats.dirt_mound_level["4"] = 1;
		} else if (dirt >= 10000) {
			player_stats.dirt_mound_level["3"] = 1;
		} else if (dirt >= 1000) {
			player_stats.dirt_mound_level["2"] = 1;
		} else if (dirt >= 100) {
			player_stats.dirt_mound_level["1"] = 1;
		} else {
			// Do nothing
		}
	}

	// Function to display visuals
	function display_visuals() {
		// Display different dirt mound heights
		if (player_stats.dirt_mound_level["5"] == 1) {
			$("#mountain5").show();
		} else if (player_stats.dirt_mound_level["4"] == 1) {
			$("#mountain4").show();
		} else if (player_stats.dirt_mound_level["3"] == 1) {
			$("#mountain3").show();
		} else if (player_stats.dirt_mound_level["2"] == 1) {
			$("#mountain2").show();
		} else if (player_stats.dirt_mound_level["1"] == 1) {
			$("#mountain1").show();
		} else {
			$("#mountain0").show();
		}
	}
	/**************************************

			End Helper Functions
		    
	***************************************/
});
