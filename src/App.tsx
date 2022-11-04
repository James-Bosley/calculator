import { FC, useEffect, useState, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";

import ButtonPanel from "./components/button-panel/ButtonPanel";
import Display from "./components/display/Display";

import "./app.scss";

export type MathOperators = "add" | "subtract" | "multiply" | "divide";
export type ActionTypes = "c" | "ce" | "backspace" | "evaluate";

export const calculateResult = (
  firstOperand: number,
  secondOperand: number,
  operator: MathOperators
): number => {
  if (typeof firstOperand !== "number" || typeof secondOperand !== "number") {
    throw new Error("Operands must be passed as type Number");
  }

  if (!Number.isSafeInteger(firstOperand)) {
    throw new Error("Unsafe number passed: " + firstOperand);
  }
  if (!Number.isSafeInteger(secondOperand)) {
    throw new Error("Unsafe number passed: " + secondOperand);
  }

  let result: number;

  switch (operator) {
    case "add":
      result = firstOperand + secondOperand;
      break;
    case "subtract":
      result = firstOperand - secondOperand;
      break;
    case "multiply":
      result = firstOperand * secondOperand;
      break;
    case "divide":
      result = firstOperand / secondOperand;
      break;
    default:
      throw new Error("Unrecognised operator: " + operator);
  }

  return result;
};

const App: FC = () => {
  const [currentInput, setCurrentInput] = useState<number | null>(0);
  const [previousInput, setPreviousInput] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [operator, setOperator] = useState<MathOperators | null>(null);

  const calculate = useCallback(
    (chained: boolean = false) => {
      if (currentInput === null) return;

      if (previousInput === null || operator === null) {
        setResult(currentInput);
        return;
      }

      const firstOperand = result || previousInput;

      let calculatedResult: number;
      try {
        calculatedResult = calculateResult(firstOperand, currentInput, operator);
      } catch (err: any) {
        calculatedResult = currentInput;
        toast.error(err?.message || "An Error Occurred");
      }

      setResult(calculatedResult);
      setPreviousInput(currentInput);
      setCurrentInput(null);

      if (!chained) {
        setOperator(null);
      }
    },
    [currentInput, previousInput, result, operator]
  );

  const handleSetOperator = useCallback(
    (operator: MathOperators | null) => {
      // This allows selection of the next operator to complete the previous calculation and
      // thus chain mathmatical operations.
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
        <Toaster />
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
      <footer className="footer">&copy;{new Date().getFullYear()} James Bosley</footer>
    </div>
  );
};

export default App;
