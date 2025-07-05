import React, { useState } from 'react';

export const XPCalculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputNumber = (num: string) => {
        if (waitingForOperand) {
            setDisplay(num);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const inputOperation = (nextOperation: string) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = (firstValue: number, secondValue: number, operation: string): number => {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
            case '=':
                return secondValue;
            default:
                return secondValue;
        }
    };

    const performCalculation = () => {
        if (operation && previousValue !== null) {
            const inputValue = parseFloat(display);
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const clearAll = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const clearEntry = () => {
        setDisplay('0');
    };

    const handleDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const buttonStyle = {
        width: '50px',
        height: '35px',
        fontSize: '14px',
        fontWeight: 'bold' as const,
        margin: '1px',
        cursor: 'pointer'
    };

    return (
        <div style={{
            padding: '10px',
            background: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <div style={{
                background: 'white',
                border: '2px inset #d4d0c8',
                padding: '8px',
                textAlign: 'right',
                fontSize: '18px',
                fontFamily: 'Courier New, monospace',
                minHeight: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                {display}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
                <button className="xp-button" style={buttonStyle} onClick={clearAll}>C</button>
                <button className="xp-button" style={buttonStyle} onClick={clearEntry}>CE</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputOperation('/')}>/</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputOperation('*')}>*</button>

                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('7')}>7</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('8')}>8</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('9')}>9</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputOperation('-')}>-</button>

                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('4')}>4</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('5')}>5</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('6')}>6</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputOperation('+')}>+</button>

                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('1')}>1</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('2')}>2</button>
                <button className="xp-button" style={buttonStyle} onClick={() => inputNumber('3')}>3</button>
                <button className="xp-button" style={{ ...buttonStyle, gridRow: 'span 2' }} onClick={performCalculation}>=</button>

                <button className="xp-button" style={{ ...buttonStyle, gridColumn: 'span 2' }} onClick={() => inputNumber('0')}>0</button>
                <button className="xp-button" style={buttonStyle} onClick={handleDecimal}>.</button>
            </div>
        </div>
    );
};