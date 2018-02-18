$(document).ready(function() {

	// Initialized variables
	var dirt = 0;
	var wood = 0;
	var stone = 0;
	var metal = 0;
	var students = 0;
	

	// Object for active skills

	// Object to keep track of our passives


	// Upgrades

	// Game loop


	// Play area clicking
	$("#play-area").click(function() {
		resource_change(10,1,1,1,1);
		console.log(dirt);
		console.log(students);
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
