const columns = ["user", "year", "day", "runs", "avg", "min", "max"];
const separator = ";";
import fs from "fs/promises"
import {Storage} from "@google-cloud/storage";
const key = "AIzaSyCb89c4Tvt61Q6140a0vmI0yHe0bLV0b3E";
const storage = new Storage();
const bucket = storage.bucket("stats.advent.racers.resistcorp.org");
async function data(fetch){
	//TODO:read actual data
	try{
		const file = bucket.file("results.csv");
		let dr = await file.download();
		const alldata = new TextDecoder().decode(dr[0]);

		let text = alldata;//await alldata.text();
		let lines = text.split("\n");
		let all = lines.map(line => line.split(separator)).filter(spl => spl?.length == columns.length).map(spl=>{
			const obj = {};
			for(let i in columns){
				obj[columns[i]] = spl[i].trim();
			}
			return obj;
		});
		let years = new Set();
		let users = new Set();
		let days = new Set();
		let data = {};
		for(let obj of all){
			let {user, year, day, runs, min, max, avg} = obj;
			if(! years.has(year)) data[year] = {days : []};
			let y = data[year];
			let d = "d-"+day;
			let year_day = `${year}-${day}`;
			if(! y[d]) y[d] = {};
			y[d][user] = {runs, avg, min, max};
			if(!days.has(year_day))
				y.days.push(day);

			users.add(user);
			years.add(year);
			days.add(year_day);
		};
		return {data, years : [...years], users : [...users], days : [...days]};
	}catch(e){
		console.log("error getting csv", e);
		return {data:{}, years : [], users : [], days : []};
	}

};

export {data};