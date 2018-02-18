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
		purchased_passives: {
			workers: {
				level: 0,
				cost: 100
			},
			vehicles_level: 0,
			slaves_level: 0,
			forester_level: 0,
			rock_quarry_level: 0,
			ore_quarry_level: 0
		},

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
	//dirt_slaves upgrade button
	$("#dirt_slaves").click(function() {
		if(dirt >= 250) {
			player_stats.purchased_passives.dirt_level += 1;
			resource_change(250,0,0,0,0);
		}	
	});

	// collect_wood upgrade button
	$("#collect_wood").click(function() {
		if(dirt >= 25000) {
			player_stats.purchased_passives.wood_level += 1;
			resource_change(25000,0,0,0,0);
		}
	});

	// collect_stone upgrade button
	$("#collect_stone").click(function() {
		if(dirt >= 15000) {
			player_stats.purchased_passives.stone_level += 1;
			resource_change(15000,0,0,0,0);
		}
	});

	//collect_metal upgrade button
	$("#collect_ore").click(function() {
		if(dirt >= 50000) {
			player_stats.purchased_passives.metal_level += 1;
			resource_change(50000,0,0,0,0);
		}
	});


	// Main game loop which updates at set intervals
	setInterval(function(){ 
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
		upgrade_costs[upgrade_name].dirt = Math.ceil(upgrade_costs[upgrade_name].dirt * 1.1);
		upgrade_costs[upgrade_name].wood = Math.ceil(upgrade_costs[upgrade_name].wood * 1.1);
		upgrade_costs[upgrade_name].stone = Math.ceil(upgrade_costs[upgrade_name].stone * 1.1);
		upgrade_costs[upgrade_name].metal = Math.ceil(upgrade_costs[upgrade_name].metal * 1.1);
	}
});
