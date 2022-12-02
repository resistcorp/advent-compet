export const get = async () =>{
	let syncthing = await getSyncthingHealth();
	let santa = await getSantaHealth();
	return {
		status : 200,
		body: {
			syncthing,
			santa
		}
	};
};

import fs from "fs/promises";
async function getSantaHealth(){
	try{
		let key = await fs.readFile("credentials/syncthing.api", "utf8");
		let devices = await fetch("http://localhost:8384/rest/system/connections",
			{
				 headers: {
			      'Content-Type': 'application/json',
			      "X-API-Key": key.replace(/\r?\n|\r/g, '')
			    },
			}).then(resp => resp.json());

		let device = devices.connections["7H7Q5MC-BP3XA76-6L3EDM5-NYXCK64-UX62ZNG-Q5XTYVL-BT46T46-2C6FLAG"]
		//let device = devices.connections["D6OEOP6-ERVGLKW-V2UYTIS-DQBMIN3-YYLA5RQ-QDDXJ4N-QKRCTT5-DCLQZAP"];
		return device.connected;
	}catch(error){
		console.error("error reading santa", error)
		return "bad config";
	}
}
async function getSyncthingHealth(){
	try{
		let {status} = await fetch("http://localhost:8384/rest/noauth/health").then(r => r.json());
		return status === "OK";
	}catch(e){
		return "bad config";
	}
}
