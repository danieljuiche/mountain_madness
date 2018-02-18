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
				cost: 1,
				effect:1
			},
			vehicles: {
				level: 0,
				cost:1000,
				effect:5
			}, 
			slaves:{
				level: 0,
				cost:250,
				effect:1
			},
			forester: {
				level: 0,
				cost:25000,
				effect:100
			},
			rock_quarry: {
				level: 0,
				cost:15000,
				effect:100
			},
			ore_quarry: {
				level: 0,
				cost:50000,
				effect:100
			}
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
	// workers upgrade button
	$("#workers").click(function() {
		var cost = player_stats.purchased_passives.workers.cost;

		cost = cost*(Math.pow(1.1,player_stats.purchased_passives.workers.level));  
		console.log(dirt);
		console.log(cost);
		if(dirt >= cost) {
			player_stats.purchased_passives.workers.level += 1;
			player_stats.purchased_passives.workers.cost = cost*(Math.pow(1.1,player_stats.purchased_passives.workers.level));
			resource_change(-cost,0,0,0,0);
		}	
	});

	//vehicles upgrade button
	$("#vehicles").click(function() {
		var cost = player_stats.purchased_passives.vehicles.cost;

		cost = cost*(Math.pow(1.1,player_stats.purchased_passives.vehicles.level));  

		if(dirt >= cost) {
			player_stats.purchased_passives.vehicles.leveld += 1;
			player_stats.purchased_passives.vehicles.cost = cost*(Math.pow(1.1,player_stats.purchased_passives.vehicles.level));
			resource_change(-cost,0,0,0,0);
		}	
	});

	//dirt_slaves upgrade button
	$("#slaves").click(function() {
		var cost = player_stats.purchased_passives.slaves.cost;

		cost = cost*(Math.pow(1.1,player_stats.purchased_passives.slaves.level));  

		if(dirt >= cost) {
			player_stats.purchased_passives.slaves.level += 1;
			player_stats.purchased_passives.slaves.cost = cost*(Math.pow(1.1,player_stats.purchased_passives.slaves.level));
			resource_change(-cost,0,0,0,0);
		}	
	});

	// collect_wood upgrade button
	$("#forester").click(function() {
		var cost = player_stats.purchased_passives.forester.cost;

		cost = cost*(Math.pow(1.1,player_stats.purchased_passives.forester.level));

		if(dirt >= cost) {
			player_stats.purchased_passives.forester.level += 1;
			layer_stats.purchased_passives.forester.cost = cost*(Math.pow(1.1,player_stats.purchased_passives.forester.level));
			resource_change(-cost,0,0,0,0);
		}
	});

	// collect_stone upgrade button
	$("#rock_quarry").click(function() {
		var cost = player_stats.purchased_passives.rock_quarry.cost;

		cost = cost*(Math.pow(1.1,player_stats.purchased_passives.rock_quarry.level));

		if(dirt >= cost) {
			player_stats.purchased_passives.rock_quarry.level += 1;
			player_stats.purchased_passives.rock_quarry.cost = cost*(Math.pow(1.1,player_stats.purchased_passives.rock_quarry.level));
			resource_change(-cost,0,0,0,0);
		}
	});

	//collect_metal upgrade button
	$("#ore_quarry").click(function() {
		var cost = player_stats.purchased_passives.ore_quarry.cost;

		cost = cost*(Math.pow(1.1,player_stats.purchased_passives.ore_quarry.level));

		if(dirt >= cost) {
			player_stats.purchased_passives.ore_quarry.level += 1;
			player_stats.purchased_passives.ore_quarry.cost = cost*(Math.pow(1.1,player_stats.purchased_passives.ore_quarry.level));
			resource_change(-cost,0,0,0,0);
		}
	});


	// Main game loop which updates at set intervals
	setInterval(function(){ 
		if(player_stats.purchased_passives.workers.level > 0) {
			var level = player_stats.purchased_passives.workers.level;
			resource_change((player_stats.purchased_passives.workers.effect * level),0,0,0,0);
		} 

		if(player_stats.purchased_passives.vehicles.level > 0) {
			var level = player_stats.purchased_passives.vehicles.level;
			resource_change((player_stats.purchased_passives.vehicles.effect * level),0,0,0,0);
		} 

		if(player_stats.purchased_passives.slaves.level > 0) {
			var level = player_stats.purchased_passives.slaves.level;
			resource_change((player_stats.purchased_passives.slaves.effect * level),0,0,0,0);
		} 

		if(player_stats.purchased_passives.forester.level > 0) {
			var level = player_stats.purchased_passives.forester.level;
			resource_change(0,(player_stats.purchased_passives.forester.effect * level),0,0,0);
		} 

		if(player_stats.purchased_passives.rock_quarry.level > 0) {
			var level = player_stats.purchased_passives.rock_quarry.level;
			resource_change(0,0,(player_stats.purchased_passives.rock_quarry.effect * level),0,0);
		} 

		if(player_stats.purchased_passives.ore_quarry.level > 0) {
			var level = player_stats.purchased_passives.ore_quarry.level;
			resource_change(0,0,0,0,0);
		} 

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
		console.log("updating scoreboard");
	}

});
