// const columns = ["user", "year", "day", "runs", "fails", "avg", "min", "max"];
const columns = ["user", "year", "day", "langage", "runs", "inputsFailed", "inputsSolved", "min", "avg", "max"];
const separator = ";";
import {dev}from "$app/env";
import fs from "fs/promises"
async function data(){
	//TODO:read actual data
	try{
		const path = dev ? "./static/results.csv" : "./assets/results.csv";

		let text = await fs.readFile(path, "utf8");
		let lines = text.split(/\r?\n/);
		let all = lines.slice(1).map(line => line.split(separator)).filter(spl => spl?.length >= columns.length).map(spl=>{
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
			let {user, year, day, runs, fails, min, max, avg} = obj;
			if(! years.has(year)) data[year] = {days : []};
			let y = data[year];
			let d = "d-"+day;
			let year_day = `${year}-${day}`;
			if(! y[d]) y[d] = {};
			y[d][user] = {...obj};
			if(!days.has(year_day))
				y.days.push(day);

			users.add(user);
			years.add(year);
			days.add(year_day);
		};
		return {data, lines, years : [...years], users : [...users], days : [...days]};
	}catch(e){
		console.log("error getting csv", e);
		return {data:{}, years : [], users : [], days : [], error : e};
	}

};

export {data};