var x = document.getElementById('num1');
var y = document.getElementById('num2');
var addBtn = document.getElementById('addBtn');
var numsArr = [];
var strArr = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', function () {
    var sum = add(+x.value, +y.value);
    console.log(sum);
    numsArr.push(sum);
    strArr.push(sum);
    console.log(numsArr);
    console.log(strArr);
    printResult({ val: sum, timestamp: new Date() });
});
