let moment = require('moment');
let date = moment();
let uuid = require('uuid');
// console.log('v1---', uuid.v1())
// console.log('v4---', uuid.v4())
// console.log(uuid.validate('f77278f0-67c7-11ec-bbae-2b70644932ba'));
// console.log(uuid.version('d4303810-846d-432a-9309-45ad212ad52a'));

let d1 = moment('2021-12-27');
let d2 = moment([2021, 2, 28]);
// console.log(date, 'dateeeeee');
// console.log(d1.format('llll'), 'd1111');
// console.log(d2.format('llll'), 'd2222');
// console.log(date.format());
// console.log(date.get('year'));
// console.log(date.get('second'));
// console.log(date.date());
// console.log(date.weekday());
// console.log(date.weekYear());
// console.log(date.dayOfYear());
// console.log(date.daysInMonth());

// moment.locale('gu');
// now = moment();
// console.log(now.format('LLLL'));

// moment.locale('hi');
// now = moment();
// console.log(now.format('LLLL'));

// moment.locale('en');
// now = moment();
// console.log(now.format('LLLL'));

// let m = moment().format('DD-MM-yyyy hh:mm A ');
// let n = moment().format('dddd, MMMM Do YYYY');
// console.log(m);
// console.log(n);

// let a = moment('2021-19-29').isValid();
// let b = moment('2021-1-23').isValid();
// console.log(a)
// console.log(b)

// let c = moment('2021-1-3').fromNow();
// let d = moment('2011-1-31').fromNow();
// console.log(c)
// console.log(d)

// let e = moment('2018-1-14').add(1, 'week');
// let f = moment('2015-4-17').add(4, 'year');
// console.log(e);
// console.log(f);

// let startDate = moment('25-09-2019', 'DD-MM-YYYY');
// let endDate = moment('15-12-2019', 'DD-MM-YYYY');
// var diff = endDate.diff(startDate, 'days');
// console.log('Days -- ' + diff);




// '++++++++++++++++++++++++++'

let momentTZ = require('moment-timezone');

let ind = momentTZ().tz("Asia/Calcutta").format();
let la = momentTZ().tz("America/Los_Angeles").format();
let london = momentTZ().tz("Europe/London").format();

let timeZone = momentTZ.tz.guess();
momentTZ.tz.setDefault('America/Los_Angeles');
let setTimeZone = momentTZ().format();

let newYork = momentTZ.tz("2021-12-25 12:00", "America/New_York");
let india = newYork.clone().tz("Asia/Calcutta");

console.log(ind);
console.log(la);
console.log(london);
console.log(timeZone);
console.log(setTimeZone);
console.log(newYork.format());
console.log(india.format());