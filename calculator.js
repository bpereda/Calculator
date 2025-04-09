class Calculator {

    constructor(screenId) {
        this.screen = document.getElementById(screenId);
        this.reset();
        this.attachEventListeners();
    }

    reset() {
        this.current = '';
        this.resultDisplayed = false;
        this.updateScreen('0');
    }

    updateScreen(value) {
        this.screen.textContent = value;
    }

    append(value) {
        if (this.resultDisplayed) {
            this.current = '';
            this.resultDisplayed = false;
        }

        this.current += value;
        this.updateScreen(this.current);
    }

    calculate() {
        try {
            const result = eval(this.current);
            this.updateScreen(result);
            this.current = String(result);
            this.resultDisplayed = true;
        } catch (error) {
            this.updateScreen('Error');
        }
    }

    toggleSign() {
        if (this.current) {
            this.current = String(eval(this.current) * -1);
            this.updateScreen(this.current);
        }
    }

    percent() {
        if (this.current) {
            this.current = String(eval(this.current) / 100);
            this.updateScreen(this.current);
        }
    }

    handleInput(value) {
        switch (value) {
            case 'AC':
                this.reset();
                break;
            case '+/-':
                this.toggleSign();
                break;
            case '%':
                this.percent();
                break;
            case '=':
                this.calculate();
                break;
            case 'calc':
                break;
            default:
                this.append(value);
        }
    }

    attachEventListeners() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            const value = btn.dataset.value;
            btn.addEventListener('click', () => this.handleInput(value));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator('screen');
});
