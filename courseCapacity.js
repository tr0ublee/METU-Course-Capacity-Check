const https = require('https');
const jsdom = require("jsdom");
const request = require('request');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const COLOR_GREEN = '\x1b[32m'
const LINERS ="=================================================================";
const LOCALHOSTPORT = 8080;
const URL = 'https://sis.metu.edu.tr/main.php';
const INDEXES = {
  CODE: 4,
  NAME: 5,
  CAPACITY: 12,
  USED: 13,
  STATUS: 19,
  SECTION: 11
};
let g_Timer = null;
let g_Stamp  = null;
let g_Semester = null  ;
let g_Program = null;
let g_CourseCode = null;
let g_RequestBody = null;
let g_Count = 0;
function strToHTML(str) {
	var doc = new jsdom.JSDOM(str);
	return doc;
}

function printRow(row) {
  if (row.item(INDEXES.CODE).textContent === g_CourseCode) {
    console.log('\n');
    console.log("Course Code: " + row.item(INDEXES.CODE).textContent);
    console.log("Course Name: " + row.item(INDEXES.NAME).textContent);
    console.log("Course Capacity: " + row.item(INDEXES.CAPACITY).textContent);
    console.log("Used Capacity: " + row.item(INDEXES.USED).textContent);
    console.log("Section:"+ row.item(INDEXES.SECTION).textContent )
  }
}

function printFound(row) {
  console.log('\n');
  console.log(COLOR_GREEN, LINERS)
  console.log(COLOR_GREEN, "FOUND")
  console.log(COLOR_GREEN, "Course Capacity: " + row.item(INDEXES.CAPACITY).textContent);
  console.log(COLOR_GREEN, "Used Capacity: " + row.item(INDEXES.USED).textContent);
  console.log(COLOR_GREEN, "Course Code: " + g_CourseCode)
  console.log(COLOR_GREEN, "SECTION: " + row.item(INDEXES.SECTION).textContent);
  console.log(COLOR_GREEN, LINERS)
}

function ringBell() {
  process.stdout.write('\u0007');
  process.stdout.clearLine();
}

function postRequest() {
  request({
    url: URL,
    method: "POST",
    gzip: true, //otherwise returns gibberish data
    headers:{
      "Host": 'sis.metu.edu.tr',
      "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0',
      "Accept": 'application/json, text/javascript, */*; q=0.01',
      "Accept-Language": 'tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3',
      "Accept-Encoding": 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      "X-Requested-With": 'XMLHttpRequest',
      "Content-Length": "" + g_RequestBody.length,
      "Origin": 'https://sis.metu.edu.tr',
    },
    json: true, 
    body: g_RequestBody
  }, function (error, response, body){
    let HTMLData = strToHTML(body.data);
    let tableData = HTMLData.window.document.querySelector('tbody'); 
    console.log("Cycle: "+ (++g_Count));
    for (let i = 0; i < tableData.rows.length; i++) {
        let row = tableData.rows.item(i).cells;
        if (row.item(INDEXES.CODE).textContent === g_CourseCode) {
          if (row.item(INDEXES.CAPACITY).textContent !== row.item(INDEXES.USED).textContent) {
            printFound(row);
            clearInterval(g_Timer); 
            g_Timer = setInterval(ringBell, 1000);
            console.log ('Press CTRL+C to stop');
          } 
        }        
    }
  });
}

async function readGlobalVariablesandRun () {
  const question = (str) => new Promise(resolve => readline.question(str, resolve));
  const urlText = await question("Enter the URL: ");
  let re = new RegExp(/stamp=[^&#]*/, 'i') // 
  let stamp = urlText.match(re)
  g_Stamp = stamp[0].split('=')[1];
  re = new RegExp(/selectSemester=[^&#]*/, 'i') // 
  let selectSemester = urlText.match(re)
  g_Semester = selectSemester[0].split('=')[1];
  re = new RegExp(/selectProgram=[^&#]*/, 'i') // 
  let selectProgram = urlText.match(re)
  g_Program = selectProgram[0].split('=')[1];
  const cc = await question("Enter the Course Code: ");
  g_CourseCode = cc;
  g_RequestBody = 'selectSemester=' + g_Semester + '&selectProgram=' + g_Program + '&submitSearchForm=Search&stamp=' + g_Stamp;
  g_Timer = setInterval(postRequest,2000); //starts
  readline.close();
}

readGlobalVariablesandRun();