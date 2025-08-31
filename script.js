const display = document.querySelector('.display');

let firstOperand = '';
let operator = '';
let isNextNum = false;
let isError = false;

window.onload = function () {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', onclickBtn);
  });
};

const onclickBtn = (e) => {
  const input = e.target;
  // 숫자 버튼
  if (input.classList.contains('number')) {
    handleNumber(input.innerText);
  }
  // 연산자 버튼
  else if (input.classList.contains('operator')) {
    handleOperator(input.value);
  } // function 버튼
  else if (input.classList.contains('function')) {
    handleFunction(input.value);
  } // 소수점 버튼
  else if (input.classList.contains('dot')) {
    handleDot();
  } // '=' 버튼
  else if (input.classList.contains('equal')) {
    handleEqual();
  } // 'C' 버튼
  else if (input.classList.contains('clear')) {
    handleClear();
  }
};

// 숫자 버튼 처리
const handleNumber = (number) => {
  if (isError) return;
  if (isNextNum) {
    display.innerText = number;
    isNextNum = false;
  } else {
    checkDisplayNum(number);
  }
};

// 소수점 처리
const hasDot = () => {
  return display.innerText.includes('.');
};

const handleDot = () => {
  if (isError) return;

  if (!hasDot()) {
    display.innerText += '.';
  }
};

// 디스플레이 숫자 확인
const checkDisplayNum = (number) => {
  if (display.innerText === '0' && !hasDot()) {
    display.innerText = number;
  } else if (display.innerText.length < 13) {
    display.innerText += number;
  } else if (display.innerText.length >= 13) {
    display.innerText = 'Error';
    isError = true;
  }
};

// 연산자 버튼 처리
const handleOperator = (operatorValue) => {
  if (isError) return;

  if (firstOperand === '') {
    firstOperand = display.innerText;
  } else if (operator !== '' && !isNextNum) {
    let secondOperand = display.innerText;
    firstOperand = calculate(firstOperand, operator, secondOperand);
    display.innerText = firstOperand;
  }

  operator = operatorValue;
  isNextNum = true;
};

// '=' 버튼 처리
const handleEqual = () => {
  if (isError) return;
  if (firstOperand !== '' && operator !== '') {
    const secondOperand = display.innerText;
    const result = calculate(firstOperand, operator, secondOperand);
    display.innerText = result;
  }
  firstOperand = '';
  operator = '';
  isNextNum = true;
};

// 'C' 버튼 처리
const handleClear = () => {
  display.innerText = '0';
  reset();
};

// function 버튼 처리
const handleFunction = (functionValue) => {
  if (isError) return;

  let currentValue = parseFloat(display.innerText);

  if (isNaN(currentValue)) return;

  let result;
  switch (functionValue) {
    case '±':
      result = currentValue * -1;
      break;
    case '%':
      result = currentValue / 100;
      break;
    default:
      return;
  }
  display.innerText = result;
};

// 초기화 처리
const reset = () => {
  firstOperand = '';
  operator = '';
  isNextNum = false;
  isError = false;
};

// 계산 함수
function calculate(firstOperand, operator, secondOperand) {
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  let result = 0;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  return result;
}
