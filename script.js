const { useState, useEffect } = React;

function Calculator() {
    const [current, setCurrent] = useState(localStorage.getItem('calc_current') || '0');
    const [previous, setPrevious] = useState(null);
    const [operator, setOperator] = useState(null);

    useEffect(() => {
        localStorage.setItem('calc_current', current);
    }, [current]);

    const appendNumber = (num) => {
        setCurrent(c => c === '0' ? num : c + num);
    };

    const clearAll = () => {
        setCurrent('0');
        setPrevious(null);
        setOperator(null);
    };

    const chooseOperator = (op) => {
        if (operator !== null) {
            compute();
        }
        setPrevious(current);
        setCurrent('0');
        setOperator(op);
    };

    const compute = () => {
        if (operator === null || previous === null) return;
        const prev = parseFloat(previous);
        const curr = parseFloat(current);
        let result = curr;
        switch (operator) {
            case 'add':
                result = prev + curr;
                break;
            case 'subtract':
                result = prev - curr;
                break;
            case 'multiply':
                result = prev * curr;
                break;
            case 'divide':
                result = prev / curr;
                break;
            default:
                break;
        }
        setCurrent(result.toString());
        setOperator(null);
        setPrevious(null);
    };

    const addDecimal = () => {
        setCurrent(c => c.includes('.') ? c : c + '.');
    };

    const toggleSign = () => {
        setCurrent(c => c.startsWith('-') ? c.slice(1) : (c !== '0' ? '-' + c : c));
    };

    const percent = () => {
        setCurrent(c => (parseFloat(c) / 100).toString());
    };

    const handleButton = (e) => {
        const action = e.target.dataset.action;
        const number = e.target.dataset.number;
        if (number) {
            appendNumber(number);
            return;
        }
        switch (action) {
            case 'clear':
                clearAll();
                break;
            case 'sign':
                toggleSign();
                break;
            case 'percent':
                percent();
                break;
            case 'decimal':
                addDecimal();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                chooseOperator(action);
                break;
            case 'equals':
                compute();
                break;
            default:
                break;
        }
    };

    return (
        <div id="calculator">
            <div id="display">{current}</div>
            <div id="buttons" onClick={handleButton}>
                <button className="function" data-action="clear">AC</button>
                <button className="function" data-action="sign">±</button>
                <button className="function" data-action="percent">%</button>
                <button className="operator" data-action="divide">÷</button>

                <button data-number="7">7</button>
                <button data-number="8">8</button>
                <button data-number="9">9</button>
                <button className="operator" data-action="multiply">×</button>

                <button data-number="4">4</button>
                <button data-number="5">5</button>
                <button data-number="6">6</button>
                <button className="operator" data-action="subtract">−</button>

                <button data-number="1">1</button>
                <button data-number="2">2</button>
                <button data-number="3">3</button>
                <button className="operator" data-action="add">+</button>

                <button className="zero" data-number="0">0</button>
                <button data-action="decimal">.</button>
                <button className="operator" data-action="equals">=</button>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Calculator />);
