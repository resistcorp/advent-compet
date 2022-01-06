export function multiScores(userNames, ...days){
	const result = Object.fromEntries(userNames.map(k=>[k, 0.0]));
	for(let day of days){
		let scores = dayScores(day);
		for(let [userName, score] of scores)
			result[userName] += score||0;
	}
	return Object.entries(result);
}

export function dayScores(day){
	let entries = [];
	let max = 0.0;
	for(let userName in day){
		let data = day[userName]
		let score = data.inputsFailed > 0 ? NaN : data.avg;
		max = Math.max(max, score||0) ;
		entries.push([userName, score]);
	}
	return entries.map( ([name, score])=>[name, score/max] );
}
