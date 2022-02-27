class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear()
  }
  //清除
  clear() {
    this.currentOperand = ""
    this.previousOperand = ""
    this.operation = undefined
  }

  //刪除
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //計算機的數字判斷
  appendNum(number) {
    //this.currentOperand = number
    //this.currentOperand = this.currentOperand.toString() + number.toString()

    //按小數點，只輸出一次
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  //計算機的符號判斷
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  //計算判斷
  //用parseFloat()將字串轉成數字
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  //階層式計算
  //只能是正整數
  factorial(num) {
    let factorialNum = this.currentOperandTextElement
    if (num === 0) return 1;
    if (num >= 1) return num * recursive(num - 1)
  }


  getDisplayNum(number) {
    const stringNum = number.toString()
    const integerDigits = parseFloat(stringNum.split('.')[0])//整數
    const decimalDigits = stringNum.split('.')[1]//小數
    // const floatNum = parseFloat(number)
    // if (isNaN(floatNum)) return ''
    // return number.toLocaleString('en')
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0//使用小數位數的最大數目
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  //計算結果的顯示
  updateDisplay() {
    //this.currentOperandTextElement.innerText = this.currentOperand
    //this.previousOperandTextElement.innerText = this.previousOperand
    this.currentOperandTextElement.innerText = this.getDisplayNum(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data_num]')
const operationButtons = document.querySelectorAll('[data_operation]')
const previousOperandTextElement = document.querySelector('[data_previous_operand]')
const currentOperandTextElement = document.querySelector('[data_current_operand]')
const allClearButton = document.querySelector('[data_all_clear]')
const deleteButton = document.querySelector('[data_delete]')
const equalsButton = document.querySelector('[data_equals]')
const factorialButton = document.querySelector('[data_factorial]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//監聽

//click計算機，innerText取得值，並顯示
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText)
    calculator.updateDisplay()
  })
})

//加減乘除-運算符號
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

//等於
equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

//全部清除
allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

//刪除
deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

//階層式
factorialButton.addEventListener('click', () => {
  calculator.factorial(console.log("階層式運算"))
  calculator.updateDisplay()
})