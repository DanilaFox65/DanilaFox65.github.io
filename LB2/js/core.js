window.onload = function () {
    let currentNumber = ''; 
    let operationsStack = []; 
    let numbersStack = []; 

    const outputElement = document.getElementById("result");

    function updateOutput() {
        
        const expression = numbersStack.join(' ') +
            (operationsStack.length > 0 ? ` ${operationsStack.join(' ')} ${currentNumber || ''}` : ` ${currentNumber || ''}`);
        outputElement.innerHTML = expression || '0';
    }

    function calculate() {
        
        const precedence = {
            '+': 1,
            '-': 1,
            'x': 2,
            '/': 2
        };

        const operatorStack = [];
        const operandStack = [];

        for (let i = 0; i < numbersStack.length; i++) {
            operandStack.push(numbersStack[i]);
            if (operationsStack[i]) {
                while (
                    operatorStack.length > 0 &&
                    precedence[operationsStack[i]] <= precedence[operatorStack[operatorStack.length - 1]]
                    ) {
                    const operator = operatorStack.pop();
                    const b = operandStack.pop();
                    const a = operandStack.pop();
                    operandStack.push(evaluate(a, b, operator));
                }
                operatorStack.push(operationsStack[i]);
            }
        }

        while (operatorStack.length > 0) {
            const operator = operatorStack.pop();
            const b = operandStack.pop();
            const a = operandStack.pop();
            operandStack.push(evaluate(a, b, operator));
        }

        return operandStack[0];
    }

    function evaluate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '/':
                return b === 0 ? "Ошибка" : a / b;
            default:
                return 0;
        }
    }

    document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
        button.onclick = function () {
            const digit = button.innerHTML;

            
            if (currentNumber === 'Ошибка') {
                currentNumber = ''; 
            }

            
            if (digit === '0' && currentNumber === '0') {
                return; 
            }

            
            if (currentNumber === '0' && digit !== '.') {
                currentNumber = digit; 
            } else {
                
                if (digit === '.' && currentNumber.includes('.')) return; 
                currentNumber += digit;
            }

            updateOutput(); 
        };
    });


    document.getElementById("btn_op_mult").onclick = () => addOperation('x');
    document.getElementById("btn_op_plus").onclick = () => addOperation('+');
    document.getElementById("btn_op_minus").onclick = () => addOperation('-');
    document.getElementById("btn_op_div").onclick = () => addOperation('/');

    function addOperation(operation) {
        if (currentNumber === '' && numbersStack.length === 0) return;
        if (currentNumber !== '') {
            numbersStack.push(currentNumber);
            currentNumber = '';
        }
        operationsStack.push(operation);
        updateOutput();
    }

    
    document.getElementById("btn_op_equal").onclick = function () {
        if (currentNumber !== '') {
            numbersStack.push(currentNumber);
            currentNumber = '';
        }
        if (numbersStack.length > 1) {
            const result = calculate();
            numbersStack = [result.toString()]; 
            operationsStack = []; 
            currentNumber = '';
            updateOutput();
        }
    };



   
    document.getElementById("btn_op_clear").onclick = function () {
        currentNumber = '';
        operationsStack = [];
        numbersStack = [];
        updateOutput();
    };

    
    document.getElementById("bth_digit_back").onclick = function () {
        if (currentNumber !== '') {
            
            currentNumber = currentNumber.slice(0, -1);
        } else if (numbersStack.length > 0) {
            
            currentNumber = numbersStack.pop();
        } else if (operationsStack.length > 0) {
            
            operationsStack.pop();
        }
        updateOutput();
    };


    
    document.getElementById("bth_digit_Square").onclick = function () {
        if (currentNumber !== '') {
            currentNumber = (Math.pow(parseFloat(currentNumber), 2)).toString();
        } else if (numbersStack.length > 0) {
            
            currentNumber = (Math.pow(parseFloat(numbersStack.pop()), 2)).toString();
        }
        updateOutput();
    };

    
    document.getElementById("bth_digit_Root").onclick = function () {
        if (currentNumber !== '') {
            const value = parseFloat(currentNumber);
            if (value < 0) {
                currentNumber = "Ошибка";
            } else {
                currentNumber = (Math.sqrt(value)).toString();
            }
            updateOutput();
        }
    };

   
    document.getElementById("btn_op_sing").onclick = function () {
        if (currentNumber !== '') {
            currentNumber = (parseFloat(currentNumber) * -1).toString();
            updateOutput();
        }
    };

    document.getElementById("btn_op_percent").onclick = function () {
        if (currentNumber !== '') {
            const percentage = parseFloat(currentNumber) / 100;

            if (operationsStack.length > 0 && operationsStack[operationsStack.length - 1] === 'x') {
                
                currentNumber = percentage.toString();
            } else if (numbersStack.length > 0) {
               
                const baseNumber = parseFloat(numbersStack[numbersStack.length - 1]);
                currentNumber = (baseNumber * percentage).toString();
            }

            updateOutput();
        }
    };

    
    document.getElementById("bth_digit_Factorial").onclick = function () {
        if (currentNumber !== '') {
            const num = parseInt(currentNumber, 10);
            currentNumber = factorial(num);
            updateOutput();
        }
    };

    function factorial(n) {
        if (n < 0) return "Ошибка";
        if (n > 50) return "Ошибка";
        if (n === 0 || n === 1) return "1";
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result.toString();
    }

    function addOperation(operation) {
        
        if (currentNumber === '' && numbersStack.length === 0) return;

        
        if (currentNumber !== '') {
            numbersStack.push(currentNumber);
            currentNumber = '';
        }

        
        if (operationsStack.length > 0 && ['+', '-', 'x', '/'].includes(operationsStack[operationsStack.length - 1])) {
            return; 
        }

        
        operationsStack.push(operation);
        updateOutput();
    }
    
    document.getElementById("bth_digit_000").onclick = function () {
        if (currentNumber !== '') {
            currentNumber += '000'; 
            updateOutput();
        }
    };


    
    const themeSwitchButton = document.getElementById('theme-switch');
    const resultElement = document.querySelector('.result');
    themeSwitchButton.addEventListener('click', function () {
        resultElement.classList.toggle('dark-mode');
    });
};
