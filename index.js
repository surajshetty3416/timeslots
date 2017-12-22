'use strict';

module.exports = class {
	constructor(maxRange, usedSlots) {
		this.availableTimeSlots = [maxRange];
		this.usedSlots = usedSlots;
	}

	getAvailableSlots() {
		let tempSlots = [];
		this.usedSlots.forEach(usedSlot => {
			this.availableTimeSlots.forEach(range => {
				tempSlots = tempSlots.concat(this.slots(range, usedSlot));
			});
		});
		this.availableTimeSlots = tempSlots;
		return this.availableTimeSlots;
	}

	freeUpSlots(freedSlots) {
		freedSlots.forEach(freedSlot => {
			let tempSlots = [];
			this.usedSlots.forEach(range => {
				tempSlots = tempSlots.concat(this.slots(range, freedSlot));
			});
			this.usedSlots = tempSlots;
		});
	}

	getAvailableSlotsBetween(range) {
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

	slots(range, usedSlot) {
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
};