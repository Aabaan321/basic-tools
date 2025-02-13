let calcScreen = document.getElementById('calc-screen');

function addToCalc(value) {
    calcScreen.value += value;
}

function clearCalc() {
    calcScreen.value = '';
}

function calculate() {
    try {
        calcScreen.value = eval(calcScreen.value);
    } catch (e) {
        calcScreen.value = 'Error';
    }
}
