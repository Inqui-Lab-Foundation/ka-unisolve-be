import http from 'k6/http';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { check, group, sleep } from 'k6';
// const options = {
//   vus: 5,
//   duration: '600ms',
// };

export const options = {  
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        // { duration: '5s', target: 2 },
        // { duration: '50s', target: 50 },
        { duration: '300s', target: 25000 },
        // { duration: '1500s', target: 500 },
      ],
      gracefulRampDown: '0s',
    },
  },

    // vus: 5,
    // duration: '60s',

//   stages: [
//     { duration: '60s', target: 1 }, // below normal load
//     // { duration: '600s', target: 500 }, // average load
//     // { duration: '1500s', target: 5000 }, // high load
    
//     // { duration: '60s', target: 5 },
// ],
  thresholds: {
   http_req_failed: ["rate<0.10"], // http errors should be less than 1%
    http_req_duration: ["p(95)<900"], // 95% of requests should be below 350ms
  },
  // httpDebug: "true",
  //userAgent: "K6GreetingsDemo/1.0",
}

const SLEEP_DURATION = 5;

// let baseUrl = "http://127.0.0.1:3002/api/v1"
// let baseUrl = "https://apidev.inquitech.in/api/v1"
// let baseUrl = "https://apiprod.inquitech.in/api/v1"
let baseUrl =     "https://tnapi.unisolve.org/api/v1"
// let baseUrl = "http://15.207.254.154:3002/api/v1"//dev
// let baseUrl = "http://3.109.59.130:3002/api/v1"//prod


export default function () {
  group('simple mentor journey', (_) => {

  
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    tags: {
      name: 'register' // first request
    }
  };

  //dashboardMapStats
  params.tags.name = 'dashboardMapStats';
  const get_dashboardMapStats = http.get(baseUrl+'/dashboard/mapStats', params);
  check(get_dashboardMapStats, {
    'is status get_dashboardMapStats 200': (r) => r.status === 200
  });
  console.log("get_dashboardMapStats",get_dashboardMapStats.json())
  sleep(SLEEP_DURATION);
      

  });
}


export function handleSummary(data) {
  return {
    "resultTeacher1.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

function getTimeStamp(){
  const date =new Date() ; 
  return "" + date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+":::"+date.getHours()+":"+
  date.getMinutes()+":"+
  date.getSeconds()+":"+date.getMilliseconds();
}



////use below command to run the file (ps change the path to the file to be path to this file on ur computer)
//k6 run /Users/amn/amn_local/dev/projects/inquilab/makenthink/backend/workspace/unisolve-be/src/utils/__test__/load__test/ltmj.js 2>&1 | tee -a output.log