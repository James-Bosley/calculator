import { FC, Dispatch, SetStateAction } from "react";
import { MathOperators } from "../../App";

import NumberButton from "../buttons/number-button/NumberButton";
import OperatorButton from "../buttons/operator-button/OperatorButton";
import ActionButton from "../buttons/action-button/ActionButton";

import "./buttonPanel.scss";

interface Props {
  setCurrentInput: Dispatch<SetStateAction<number | null>>;
  setPreviousInput: Dispatch<SetStateAction<number | null>>;
  operator: MathOperators | null;
  setOperator: (operator: MathOperators | null) => void;
  setResult: Dispatch<SetStateAction<number | null>>;
  calculate: () => void;
}

const ButtonPanel: FC<Props> = ({
  setCurrentInput,
  setPreviousInput,
  operator,
  setOperator,
  setResult,
  calculate,
}) => {
  const handleNumClick = (value: string) => {
    setCurrentInput(prevState => {
      if (prevState) {
        const newNumString = prevState.toString() + value;
        return Number(newNumString);
      } else {
        return Number(value);
      }
    });
  };

  const handleBackspace = () => {
    setCurrentInput(prevState => {
      if (prevState) {
        const newNumString = prevState.toString().slice(0, -1);
        return Number(newNumString);
      } else {
        return null;
      }
    });
  };

  const clearEntry = () => {
    setCurrentInput(null);
  };

  const clear = () => {
    setPreviousInput(null);
    setCurrentInput(null);
    setOperator(null);
    setResult(null);
  };

  return (
    <div className="button-panel">
      <div className="button-panel__row">
        <ActionButton type="ce" action={clearEntry} />
        <ActionButton type="c" action={clear} />
        <ActionButton type="backspace" action={handleBackspace} />

        <OperatorButton type="divide" currentOperator={operator} setOperator={setOperator} />
      </div>
      <div className="button-panel__row">
        <NumberButton value="1" handleClick={handleNumClick} />
        <NumberButton value="2" handleClick={handleNumClick} />
        <NumberButton value="3" handleClick={handleNumClick} />

        <OperatorButton type="multiply" currentOperator={operator} setOperator={setOperator} />
      </div>
      <div className="button-panel__row">
        <NumberButton value="4" handleClick={handleNumClick} />
        <NumberButton value="5" handleClick={handleNumClick} />
        <NumberButton value="6" handleClick={handleNumClick} />

        <OperatorButton type="subtract" currentOperator={operator} setOperator={setOperator} />
      </div>
      <div className="button-panel__row">
        <NumberButton value="7" handleClick={handleNumClick} />
        <NumberButton value="8" handleClick={handleNumClick} />
        <NumberButton value="9" handleClick={handleNumClick} />

        <OperatorButton type="add" currentOperator={operator} setOperator={setOperator} />
      </div>
      <div className="button-panel__row button-panel__row--last">
        <NumberButton value="0" handleClick={handleNumClick} />

        <ActionButton type="evaluate" action={calculate} />
      </div>
    </div>
  );
};

export default ButtonPanel;
