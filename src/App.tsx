import { FC, useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

import ButtonPanel from "./components/button-panel/ButtonPanel";
import Display from "./components/display/Display";

export type MathOperators = "add" | "subtract" | "multiply" | "divide";

const App: FC = () => {
  const [currentInput, setCurrentInput] = useState<number>(0);
  const [previousInput, setPreviousInput] = useState<number | null>(null);
  const [operator, setOperator] = useState<MathOperators | null>(null);

  const calculate = useCallback(
    (isChained: boolean = false) => {
      if (!previousInput) return;
      let calculatedResult: number;

      switch (operator) {
        case "add":
          calculatedResult = previousInput + currentInput;
          break;
        case "subtract":
          calculatedResult = previousInput - currentInput;
          break;
        case "multiply":
          calculatedResult = previousInput * currentInput;
          break;
        case "divide":
          calculatedResult = previousInput / currentInput;
          break;
        default:
          calculatedResult = currentInput;
      }

      if (Number.isSafeInteger(calculatedResult)) {
        if (isChained) {
          setCurrentInput(0);
          setPreviousInput(calculatedResult);
        } else {
          setCurrentInput(calculatedResult);
          setPreviousInput(null);
        }
      } else {
        toast.error("Result is larger than JavaScript's ability to safely calculate.");
      }
    },
    [currentInput, previousInput, operator]
  );

  const handleSetOperator = useCallback(
    (operator: MathOperators | null) => {
      setOperator(operator);
      if (!operator) return;

      if (previousInput && currentInput > 0) {
        calculate(true);
      } else {
        setPreviousInput(currentInput);
        setCurrentInput(0);
      }
    },
    [calculate, currentInput, previousInput]
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
    <div className="calculator">
      <Toaster />
      <Display
        currentInput={currentInput}
        previousInput={previousInput}
        setCurrentInput={setCurrentInput}
      />
      <ButtonPanel
        setCurrentInput={setCurrentInput}
        setPreviousInput={setPreviousInput}
        setOperator={handleSetOperator}
        calculate={calculate}
      />
    </div>
  );
};

export default App;
