//For credit servie flask version upgrade

import http from 'k6/http';
import { check } from 'k6';

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
 
export let options = {
    // vus: 10,
    // duration: '30s',
    stages: [
        { duration: '5s', target: 500 },
        { duration: '5s', target: 1500 },
        { duration: '5s', target: 1500},
        {duration: '5s', target: 1000},
        { duration: '5s', target: 500 },
        {duration: '5s', target: 0},
    ],
};
 
export default () => {
    var url = 'http://36.255.68.245/ping';
    let res = http.get(url);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'json contains pong':(r) => r.json().message === 'pong!',
    });
}

