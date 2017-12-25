'use strict';

module.exports = class {
	constructor(maxRange, usedSlots) {
		this.usedSlots = usedSlots;
		this.availableTimeSlots = this.getAvailableTimeSlots([maxRange], usedSlots);
	}

	get freeSlots() {
		return this.availableTimeSlots;
	}

	addUsedSlots(usedSlotsArray) {
		this.usedSlots = this.usedSlots.concat(usedSlotsArray);
		this.availableTimeSlots = this.getAvailableTimeSlots(this.availableTimeSlots, usedSlotsArray);
	}

	getFreeSlotsBetween(range) {
		let availableSlots = [];
		this.availableTimeSlots.forEach(slot => {
			if (slot.start >= range.end || slot.end <= range.start) {
				return;
			} else if (slot.start >= range.start && slot.end <= range.end) {
				availableSlots.push(slot);
			} else if (slot.start <= range.start && slot.end >= range.end) {
				availableSlots.push(range);
			} else if (slot.start < range.start && slot.end < range.end) {
				availableSlots.push({
					'start': range.start,
					'end': slot.end,
				});
			} else if (slot.start > range.start && slot.end > range.end) {
				availableSlots.push({
					'start': slot.start,
					'end': range.end,
				});
			}
		});
		return availableSlots;
	}

	getAvailableTimeSlots(availableTimeSlots, usedSlots) {
		usedSlots.forEach(usedSlot => {
			let tempSlots = [];
			availableTimeSlots.forEach(range => {
				tempSlots = tempSlots.concat(this.getAvailablePatches(range, usedSlot));
			});
			availableTimeSlots = tempSlots;
		});
		return availableTimeSlots;
	}

	getAvailablePatches(range, usedSlot) {
		let timeSlotArray = [];
		if (range.start > usedSlot.end || range.end < usedSlot.start) {
			timeSlotArray.push(range);
		} else {
			if (range.start < usedSlot.start) {
				timeSlotArray.push({
					'start': range.start,
					'end': usedSlot.start,
				});
			}
			if (range.end > usedSlot.end) {
				timeSlotArray.push({
					'start': usedSlot.end,
					'end': range.end,
				});
			}
		}
		return timeSlotArray;
	}

	getOverlappingUsedSlots() {
		let slots = this.usedSlots;
		let arrayToReturn = [];
		for (let index = 0; index < slots.length; index++) {
			let arr = [];
			let slot1 = slots[index];
			for (let index2 = index + 1; index2 < slots.length; index2++) {
				let slot2 = slots[index2];
				if (!(slot1.start >= slot2.end || slot1.end <= slot2.start)) {
					arr.push(slots[index2]);
				}
			}
			if (arr.length) {
				arr.splice(0, 0, slot1);
				arrayToReturn.push(arr);
			}
		}
		return arrayToReturn;
	}
};