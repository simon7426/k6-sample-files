import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
	ext: {
		    loadimpact: {
				name: `${__ENV.TEST_NAME}` || "RPS hammering test",
				projectID: 3478725,
			}
	}
};

export default function() {
	for(let i=0;i<20;i++){
		http.get('http://36.255.68.245/ping');
		check(res, {
			'is status 200': (r) => r.status === 200,
			'json contains pong':(r) => r.json().message === 'pong!',
		});
	}
	sleep(0.1);
}
