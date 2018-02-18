$(document).ready(function() {

	// Initialized and current resources
	var dirt = 0;
	var wood = 0;
	var stone = 0;
	var metal = 0;
	var students = 0;

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
		// purchased_passives: {
		// 	workers: {
		// 		level: 0,
		// 		cost: 1,
		// 		effect:1
		// 	},
		// 	vehicles: {
		// 		level: 0,
		// 		cost:1000,
		// 		effect:5
		// 	}, 
		// 	slaves:{
		// 		level: 0,
		// 		cost:250,
		// 		effect:1
		// 	},
		// 	forester: {
		// 		level: 0,
		// 		cost:25000,
		// 		effect:100
		// 	},
		// 	rock_quarry: {
		// 		level: 0,
		// 		cost:15000,
		// 		effect:100
		// 	},
		// 	ore_quarry: {
		// 		level: 0,
		// 		cost:50000,
		// 		effect:100
		// 	}
		// },

		// Active upgrade levels
		purchased_upgrades: {
			buckets: 0,
			shovels: 0,
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
			x: 0,
		}
	}

	var upgrade_costs = {
		workers: {
			dirt: 10,
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
			dirt: 100,
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
		pickaxe: {
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
		}
		/*


			NEED TO ADD IN DRILLS


		*/
	}



	var game_update_frequency = 500; //Milliseconds

	// Check for passive upgrades
	// workers upgrade button
	$("#workers").click(function() {


		if (resource_purchase_check("workers")) {
			resource_purchase_update("workers"); // Take away the resources to purchase the tool
			player_stats.passive_dirt += 1; // Increase passive amount
			player_stats.purchased_passives["workers"] += 1;
			cost_increase("workers"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	//vehicles upgrade button
	$("#vehicles").click(function() {
		if (resource_purchase_check("vehicles")) {
			resource_purchase_update("vehicles"); // Take away the resources to purchase the tool
			player_stats.passive_dirt += 5; // Increase passive amount
			player_stats.purchased_passives["vehicles"] += 1;
			cost_increase("vehicles"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	//dirt_slaves upgrade button
	$("#slaves").click(function() {
		if (resource_purchase_check("slaves")) {
			resource_purchase_update("slaves"); // Take away the resources to purchase the tool
			player_stats.passive_dirt += 1; // Increase passive amount
			player_stats.purchased_passives["slaves"] += 1;
			cost_increase("slaves"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	// collect_wood upgrade button
	$("#forester").click(function() {
		if (resource_purchase_check("forester")) {
			resource_purchase_update("forester"); // Take away the resources to purchase the tool
			player_stats.passive_wood += 100; // Increase passive amount
			player_stats.purchased_passives["forester"] += 1;
			cost_increase("forester"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	// collect_stone upgrade button
	$("#rock_quarry").click(function() {
		if (resource_purchase_check("rock_quarry")) {
			resource_purchase_update("rock_quarry"); // Take away the resources to purchase the tool
			player_stats.passive_stone += 100; // Increase passive amount
			player_stats.purchased_passives["rock_quarry"] += 1;
			cost_increase("rock_quarry"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});

	//collect_metal upgrade button
	$("#ore_quarry").click(function() {
		if (resource_purchase_check("ore_quarry")) {
			resource_purchase_update("ore_quarry"); // Take away the resources to purchase the tool
			player_stats.passive_metal += 100; // Increase passive amount
			player_stats.purchased_passives["ore_quarry"] += 1;
			cost_increase("ore_quarry"); // Increase cost
			update_resources(); // Update resources immediately
		}
	});


	// Main game loop which updates at set intervals
	setInterval(function(){ 
		resource_change(player_stats.passive_dirt,0,0,0,0);
		update_resources();
	}, game_update_frequency);


	// Play area clicking
	$("#play-area").click(function() {
		resource_change(player_stats.dirt_per_click, 0, 0, 0, 0);
		update_resources();
	});

	/*


	 Upgrade area clicking


	*/

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




	// Functions for adding resources
	function resource_change(dirt_change, wood_change, stone_change, metal_change, students_change) {
		dirt += dirt_change;
		wood += wood_change;
		stone += stone_change;
		metal += metal_change;
		students += students_change;
	}

	// Function for updating resources to scoreboard
	function update_resources() {
		$(".dirt-amount").html("Dirt: " + dirt);
		$(".wood-amount").html("Wood: " + wood);
		$(".stone-amount").html("Stone: " + stone);
		$(".metal-amount").html("Metal: " + metal);
		$(".students-amount").html("Students: " + students);
		console.log("updating scoreboard");
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
});
