# Timeslots

Get free time patches between given time range

___


### Usage
```javascript
const Timeslot = require('timeslots');

// Pass 'start' and 'end' in UNIX TIME (Milliseconds)
const maxRange = {
  'start': 1483228800000, // Sunday, 1 January 2017 00:00:00:000 GMT
  'end': 1483315199999 // Sunday, 1 January 2017 23:59:59:999 GMT
}

const usedSlots = [
  { 'start': 1483232400000, 'end': 1483236000000 }, // 1am - 2am
  { 'start': 1483237800000, 'end': 1483248600000 }, // 2:30am - 5:30am
  { 'start': 1483270200000, 'end': 1483295400000 }, // 11:30am - 6:30pm
];


const manager = new Timeslot(maxRange, usedSlots);
```

#### Available timeslots 

Find free time-slots from the provided max range and used slots 
```javascript
manager.freeSlots 
/* [ 
  { start: 1483228800000, end: 1483232400000 }, // 0am - 1am
  { start: 1483236000000, end: 1483237800000 }, // 2am - 2:30 am
  { start: 1483248600000, end: 1483270200000 }, // 5:30 am - 11-30am
  { start: 1483295400000, end: 1483315199999 }  // 6:30 pm - 11:59pm
] */

```

#### Add more used slots
```javascript
const additionalUsedSlots = [
  {'start': 1483228800000, 'end': 1483232400000 }, // 0am - 1am
  { 'start': 1483236000000, 'end': 1483237900000 } // 2am - 2:31:40am
];

manager.addUsedSlots(additionalUsedSlots);

manager.freeSlots 
/* [ 
  { start: 1483248600000, end: 1483270200000 }, // 5:30 am - 11-30am
  { start: 1483295400000, end: 1483315199999 }  // 6:30 pm - 11:59pm
] */
```

#### Time-slots between 
Get free time slots between a time range (must be a subset of max range)
```javascript
manager.getFreeSlotsBetween({ 'start': 1483237799990, 'end': 1483286400000 }); // 2:29:59 am - 4 pm
/* [ 
  { start: 1483248600000, end: 1483270200000 }, // 5:30 am - 11-30am 
] */

```


#### Overlapping slots
Find overlapping used slots ( returns an array of arrays) 
```javascript
manager.getOverlappingUsedSlots();
/*
[ 
  [ 
    { start: 1483237800000, end: 1483248600000 }, // 2:30am - 5:30am 
    { start: 1483236000000, end: 1483237900000 }  // 2am - 2:31:40am
  ]     
]
*/

```
