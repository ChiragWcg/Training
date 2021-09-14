const data = [{
    a: true,
    b: false
}, {
    a: false,
    b: true
}];
let res = false;
let demo;
while (demo = data.pop()) {
    res = demo.a;
}
console.log(res)