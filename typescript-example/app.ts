const x = document.getElementById('num1') as HTMLInputElement;
const y = document.getElementById('num2') as HTMLInputElement;
const addBtn = document.getElementById('addBtn')!;

const numsArr: Array<number> = [];
const strArr: string[] = [];
type NumOrString = number | string 

interface ResultObj {
  val: number,
  timestamp: Date
}

function add(num1: NumOrString, num2: NumOrString) {
  if(typeof num1==='number' && typeof num2 ==='number'){
    return num1 + num2
  }else if(typeof num1 === 'string' && typeof num2 ==='string'){
    return num1 + ' ' + num2;
  }
  return +num1 + +num2;
}

function printResult(resultObj:ResultObj){
  console.log(resultObj.val);
}

addBtn?.addEventListener('click', ()=>{
  let sum = add(+x.value, +y.value);
  console.log(sum);
  numsArr.push(sum as number);
  strArr.push(sum as string);
  console.log(numsArr);
  console.log(strArr);
  printResult({val: sum as number, timestamp: new Date()});
})

