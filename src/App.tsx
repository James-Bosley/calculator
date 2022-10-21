import { FC, useEffect, useState, useCallback } from "react";

import ButtonPanel from "./components/button-panel/ButtonPanel";
import Display from "./components/display/Display";

import "./app.scss";

export type MathOperators = "add" | "subtract" | "multiply" | "divide";
export type ActionTypes = "c" | "ce" | "backspace" | "evaluate";

const App: FC = () => {
  const [currentInput, setCurrentInput] = useState<number | null>(0);
  const [previousInput, setPreviousInput] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [operator, setOperator] = useState<MathOperators | null>(null);

  const calculate = useCallback(
    (chained: boolean = false) => {
      if (currentInput === null) return;
      if (previousInput === null) {
        setResult(currentInput);
        return;
      }

      let calculatedResult: number;
      const firstOperand = result || previousInput;

      switch (operator) {
        case "add":
          calculatedResult = firstOperand + currentInput;
          break;
        case "subtract":
          calculatedResult = firstOperand - currentInput;
          break;
        case "multiply":
          calculatedResult = firstOperand * currentInput;
          break;
        case "divide":
          calculatedResult = firstOperand / currentInput;
          break;
        default:
          calculatedResult = currentInput;
      }

      calculatedResult = Number(calculatedResult.toFixed(2));

      setResult(calculatedResult);
      setCurrentInput(null);
      setPreviousInput(currentInput);

      if (!chained) {
        setOperator(null);
      }
    },
    [currentInput, previousInput, result, operator]
  );

  const handleSetOperator = useCallback(
    (operator: MathOperators | null) => {
      // This allows selection of the operator to complete the previous calculation and
      // chain mathmatical operations.
      if (previousInput && currentInput) {
        calculate(true);
      } else {
        setPreviousInput(currentInput);
        setCurrentInput(null);
      }

      setOperator(operator);
    },
    [previousInput, currentInput, calculate]
  );

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          calculate();
          break;
        case "+":
          handleSetOperator("add");
          break;
        case "-":
          handleSetOperator("subtract");
          break;
        case "*":
          handleSetOperator("multiply");
          break;
        case "/":
          handleSetOperator("divide");
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", keydownListener);

    return () => window.removeEventListener("keydown", keydownListener);
  }, [calculate, handleSetOperator]);

  return (
    <div className="app">
      <div className="calculator">
        <Display currentInput={currentInput} setCurrentInput={setCurrentInput} result={result} />
        <ButtonPanel
          setCurrentInput={setCurrentInput}
          setPreviousInput={setPreviousInput}
          setResult={setResult}
          operator={operator}
          setOperator={handleSetOperator}
          calculate={calculate}
        />
      </div>
    </div>
  );
};

export default App;
