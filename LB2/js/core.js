window.onload = function() {
    let a = '0';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    outputElement = document.getElementById("result");
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    // Theme switching logic
    const themeSwitchButton = document.getElementById('theme-switch');
    themeSwitchButton.addEventListener('click', function () {
        outputElement.classList.toggle('dark-mode');
    });

    function limitOutputLength() {
        if (outputElement.innerHTML.length >= 19) {
            outputElement.innerHTML = '..' + outputElement.innerHTML.slice(-17);
        }
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (a === '' && (digit === '000' || digit == '.') || a === '0' && (digit === '0' || digit === '000')) return;
            if (a === '-' && (digit === '0' || digit === '000' || digit == '.')) return;
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                if (a === '0' && digit !== '.')
                    a = digit;
                else
                    a += digit;
            }
            outputElement.innerHTML = a;
            limitOutputLength();
        } else {
            if (b === '' && (digit === '000' || digit == '.') || b === '0' && (digit === '0' || digit === '000')) return;
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = a + selectedOperation + b;
                limitOutputLength();
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '' || selectedOperation || a === '-') return;
        selectedOperation = 'x';
        outputElement.innerHTML = a + selectedOperation;
        limitOutputLength();
    };

    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '' || a === '-' || (selectedOperation && selectedOperation !== "+" && selectedOperation !== "-")) return;

        if (selectedOperation && b !== '') {
            if (selectedOperation === '+') {
                a = ((+a) + (+b)).toString();
            } else if (selectedOperation === '-') {
                a = ((+a) - (+b)).toString();
            }
            b = '';
            outputElement.innerHTML = a;
        }

        selectedOperation = '+';
        outputElement.innerHTML = a + selectedOperation;
        limitOutputLength();
    };

    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') {
            a = '-';
            outputElement.innerHTML = '-';
        }
        else {
            if (a === '-' || (selectedOperation && selectedOperation !== "+" && selectedOperation !== "-")) return;

            if (selectedOperation && b !== '') {
                if (selectedOperation === '+') {
                    a = ((+a) + (+b)).toString();
                } else if (selectedOperation === '-') {
                    a = ((+a) - (+b)).toString();
                }
                b = '';
                outputElement.innerHTML = a;
            }

            selectedOperation = '-';
            outputElement.innerHTML = a + selectedOperation;
            limitOutputLength();
        }
    };

    document.getElementById("btn_op_div").onclick = function() {
        if (a === '' || selectedOperation || a === '-') return;
        selectedOperation = '/';
        outputElement.innerHTML = a + selectedOperation;
        limitOutputLength();
    };

    document.getElementById("btn_op_clear").onclick = function() {
        a = '0';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    };

    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '' || b !== '' || a === '-') return;

        else {
            if (!selectedOperation) {
                if (!a.includes('-'))
                    a = '-' + a;
                else
                    a = a.slice(1);
                outputElement.innerHTML = a;
                limitOutputLength();
            }
            else {
                if (selectedOperation === '+') {
                    selectedOperation = '-';
                    outputElement.innerHTML = a + selectedOperation;
                }
                else if (selectedOperation === '-') {
                    selectedOperation = '+';
                    outputElement.innerHTML = a + selectedOperation;
                }
                else return;
            }
        }
    };

    document.getElementById("btn_op_delete").onclick = function() {
        if (b !== '') {
            b = b.slice(0, -1);
            outputElement.innerHTML = outputElement.innerHTML.slice(0, -1);
        }
        else if (selectedOperation) {
            selectedOperation = null;
            outputElement.innerHTML = outputElement.innerHTML.slice(0, -1);
        }
        else if (a != '') {
            if (a.length == 1) {
                outputElement.innerHTML = 0;
                a = '';
            }
            else {
                a = a.slice(0, -1);
                outputElement.innerHTML = outputElement.innerHTML.slice(0, -1);
            }
        }
    };

    document.getElementById("btn_op_square").onclick = function() {
        if ((a === ''&& b === '') || a === '-') return;
        if (!selectedOperation) {
            a = ((+a) * (+a)).toString();
            outputElement.innerHTML = a;
            limitOutputLength();
        }
        else {
            if (b === '') return;
            outputElement.innerHTML = outputElement.innerHTML.slice(0, - b.length);
            b = ((+b) * (+b)).toString();
            outputElement.innerHTML += b;
            limitOutputLength();
        }
    };

    document.getElementById("btn_op_square_root").onclick = function() {
        if ((a === ''&& b === '') || a === '-') return;
        if (!selectedOperation) {
            if (+a > 0) {
                a = Math.sqrt((+a)).toString();
                outputElement.innerHTML = a;
                limitOutputLength();
            }
            else {
                a = '';
                outputElement.innerHTML = "ошибка";
            }
        }
        else {
            if (b === '') return;
            if (+b > 0) {
                outputElement.innerHTML = outputElement.innerHTML.slice(0, - b.length);
                b = Math.sqrt((+b)).toString();
                outputElement.innerHTML += b;
                limitOutputLength();
            }
            else {
                b = '';
                outputElement.innerHTML = "ошибка";
            }
        }
    };

    document.getElementById("btn_op_factorial").onclick = function() {
        if ((a === '' && b === '') || a === '-') return;
        if (!selectedOperation) {
            let i = 1; let value = 1;
            if (+a > 20) {
                a = '';
                outputElement.innerHTML = 'Инфинити';
            }
            else {
                while (i <= (+a)) {
                    value = i * value;
                    i += 1;
                }
                a = value.toString();
                outputElement.innerHTML = a;
                limitOutputLength();
            }
        }
        else {
            if (+b > 20) {
                a = '';
                b = '';
                selectedOperation = null;
                outputElement.innerHTML = 'Инфинити';
            }
            if (b === '') return;
            outputElement.innerHTML = outputElement.innerHTML.slice(0, - b.length);
            let i = 1; let value = 1;
            while (i <= (+b)) {
                value = i * value;
                i += 1;
            }
            b = value.toString();
            outputElement.innerHTML += b;
            limitOutputLength();
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (!a || a === '-') return;

        if (b === '') {
            a = ((+a) / 100).toString();
            outputElement.innerHTML = a;
            limitOutputLength();
        } else {
            b = ((+b) / 100 * (+a)).toString();
            outputElement.innerHTML += '%';
            limitOutputLength();
        }
    };

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return;

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
        }

        if (expressionResult == 0 || expressionResult == "Infinity")
            a = '0';
        else
            a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        outputElement.innerHTML = expressionResult.toString();
        limitOutputLength();
    };
};
