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

		// True or false switches for active upgrades
		purchased_upgrades: {
			dirt: {
				buckets: 0,
				shovels: 0,
				excavator: 0,
				backhoe: 0
			},
			wood: {
				axe: 0,
				hacksaw: 0,
				chainsaw: 0
			},
			stone: {
				pickaxe: 0,
				sledgehammer: 0,
				dynamite: 0
			},
			metal: {
				drill: 0,
				minecart: 0,
				x: 0,
			}
		}
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

});
