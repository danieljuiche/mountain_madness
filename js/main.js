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
			dirt_level: 0,
			wood_level: 0,
			stone_level: 0,
			metal_level: 0
		}
	}

	var game_update_frequency = 500; //Milliseconds

	function Students(population) {
		this.population = 0;
	}

	function AutomaticCollectors(dirtCost, dirtSec, woodSec, stoneSec, metalSec) {
		this.dirtCost = 
	}
	// Object for active skills

	// Active upgrade information
	// var active_upgrades = {
	// 	dirt: {
	// 		costs: {
	// 			level_1: 10 
	// 		}
	// 		benefits:
	// 		description:
	// 	}

	// }


	// Upgrades

	//dirt_slaves upgrade button
	$("#dirt_slaves").click(function()) {
		if(dirt >= 250) {
			player_stats.purchased_passives.dirt_level += 1;
			resource_change(250,0,0,0,0);
		}	
	}

	// collect_wood upgrade button
	$("#collect_wood").click(function()) {
		if(dirt >= 25000) {
			player_stats.purchased_passives.wood_level += 1;
			resource_change(25000,0,0,0,0);
		}
	}

	// collect_stone upgrade button
	$("#collect_stone").click(function()) {
		if(dirt >= 15000) {
			player_stats.purchased_passives.stone_level += 1;
			resource_change(15000,0,0,0,0);
		}
	}

	//collect_metal upgrade button
	$("#collect_ore").click(function()) {
		if(dirt >= 50000) {
			player_stats.purchased_passives.metal_level += 1;
			resource_change(50000,0,0,0,0);
		}
	}

	// Main game loop

	setInterval(function(){ 
		if (1) {
			resource_change(10,10,10,10,10);
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

	function update_resources() {
		$(".dirt-amount").html("Dirt: " + dirt);
		$(".wood-amount").html("Wood: " + wood);
		$(".stone-amount").html("Stone: " + stone);
		$(".metal-amount").html("Metal: " + metal);
		$(".students-amount").html("Students: " + students);


	}

});
