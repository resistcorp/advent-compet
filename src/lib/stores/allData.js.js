import {readable} from "svelte/store";
import {assets} from "$app/paths";

const NOOP = ()=>{};
const _users = new Set();
let setUsers = NOOP;
let addUser = user => {
	if(_users.has(user))
		return false;
	_users.add(user);
	setUsers(_users.values());
	return true;
}

const DEAD_DAY = readable({}, set => NOOP);
const _years = new Set();
let setYears = NOOP;
let addYear = year => {
	if(_years.has(year))
		return false;
	_years.add(year);
	setYears(_years.values());
	return true;
}
export const years = readable([], set => {
	setYears = set;
	return ()=> setYears = NOOP;;
});

const _days = new Set;
const _dayStores = {};
let setDays = NOOP;
let addDay = day => {
	if(_days.has(day))
		return _dayStores[day];
	_days.add(day);
	let setter = readable({}, set => NOOP);
	setDays(_days.values());
	return true;
}
export function getDayData(dayId){
	return _dayStores[dayId] || DEAD_DAY;
}

export const days = readable([], set => {
	setDays = set;
	return ()=> setDays = NOOP;
});
export const users = readable([], set => {
	setUsers = set;
	return ()=> setUsers = NOOP;
});
const TIME = 5000;
let last_stamp = 0;

export async function checkData(){
	let r = await fetch("/timestamp.json");
	let {stamp} = await r.json();
	if(last_stamp < stamp){
		console.log("got new timestamp!");
		// last_stamp = stamp;

		let r = await fetch(assets + "/results.csv");
		for await (const result of stream(r.body)) {
			console.log("got data :", result);
			// Display loaded/total in the UI
		}
	}
	setTimeout(checkData, TIME);
}
async function* stream(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
