console.log('Welcome here...');

// area of triangle
var l = 25;
var w = 10;
console.log('Area of triangle is ' + (l * w));

// area of square
var s = 20;
console.log('Area of square is ' + (s * s));

// area of circle
var r = 10;
var pi = 3.14;
console.log('Area of circle is ' + (pi * r * r));

//Average of 5 numbers.
var a, b, c, d, e;
a = 6;
b = 7;
c = 8;
d = 9;
e = 10;

var res = (a + b + c + d + e) / 5;
console.log('Average of five numbers are ' + res);

//check smallest/largest number
if (a < b) {
    console.log("A is lesser than B");
}
else {
    console.log("A is greater than B");
}

//check odd-even number
if (a % 2 == 0) {
    console.log("A is EVEN number");
}
else {
    console.log('A is ODD number');
}

//check leap year or not
var year = 2022;
if (year % 4 == 0 || year % 400 == 0) {
    if (year % 100 != 0) {
        console.log(year + " is a Leap year");
    }
    else {
        console.log(year + ' is not leap year');
    }
}
else {
    console.log(year + ' is not leap year');
}

//check zero, positive or negative
var n = -27;
if (n == 0) {
    console.log('You have entered ZERO');
}
else if (n > 0) {
    console.log(n + ' is Positive Value');
}
else {
    console.log(n + ' is Negative value');
}

var j = 5;
var fact = 1;
for (i = 1; i <= j; i++) {
    fact = fact * i;
}
console.log('Factorial of ' + j + " is " + fact);


//swap two numbers
console.log('A = ' + a);
console.log('B = ' + b);

c = a;
a = b;
b = c;

console.log('A = ' + a);
console.log('B = ' + b);


//print square of entered number if n<10
var n = 6;
if (n < 10) {
    console.log('square of ' + n + ' is ' + n * n);
}
else {
    console.log('You entered greatest number than 10');
}

//multiplication table
console.log('Multiplication table');
for (i = 1; i <= n; i++) {
    console.log(n * i);
}

