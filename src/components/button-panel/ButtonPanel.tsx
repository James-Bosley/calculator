import { FC, Dispatch, SetStateAction } from "react";
import { MathOperators } from "../../App";

import NumberButton from "../buttons/number-button/NumberButton";
import OperatorButton from "../buttons/operator-button/OperatorButton";
import ActionButton from "../buttons/action-button/ActionButton";

import "./buttonPanel.scss";

interface Props {
  setCurrentInput: Dispatch<SetStateAction<number>>;
  setPreviousInput: Dispatch<SetStateAction<number | null>>;
  setOperator: (operator: MathOperators | null) => void;
  calculate: () => void;
}

const ButtonPanel: FC<Props> = ({ setCurrentInput, setPreviousInput, setOperator, calculate }) => {
  const handleNumClick = (value: string) => {
    setCurrentInput(prevState => {
      const newNumString = prevState.toString() + value;
      return Number(newNumString);
    });
  };

  const handleBackspace = () => {
    setCurrentInput(prevState => {
      const newNumString = prevState.toString().slice(0, -1);
      return Number(newNumString);
    });
  };

  const clearEntry = () => {
    setCurrentInput(0);
  };

  const clear = () => {
    setCurrentInput(0);
    setPreviousInput(null);
    setOperator(null);
  };

  return (
    <div className="button-panel">
      <div className="button-panel__row">
        <ActionButton type="ce" action={clearEntry} />
        <ActionButton type="c" action={clear} />
        <ActionButton type="backspace" action={handleBackspace} />

        <OperatorButton type="divide" setOperator={setOperator} />
      </div>
      <div className="button-panel__row">
        <NumberButton value="1" handleClick={handleNumClick} />
        <NumberButton value="2" handleClick={handleNumClick} />
        <NumberButton value="3" handleClick={handleNumClick} />

        <OperatorButton type="multiply" setOperator={setOperator} />
      </div>
      <div className="button-panel__row">
        <NumberButton value="4" handleClick={handleNumClick} />
        <NumberButton value="5" handleClick={handleNumClick} />
        <NumberButton value="6" handleClick={handleNumClick} />

        <OperatorButton type="subtract" setOperator={setOperator} />
      </div>
      <div className="button-panel__row">
        <NumberButton value="7" handleClick={handleNumClick} />
        <NumberButton value="8" handleClick={handleNumClick} />
        <NumberButton value="9" handleClick={handleNumClick} />

        <OperatorButton type="add" setOperator={setOperator} />
      </div>
      <div className="button-panel__row button-panel__row--last">
        <NumberButton value="0" handleClick={handleNumClick} />

        <ActionButton type="evaluate" action={calculate} />
      </div>
    </div>
  );
};

export default ButtonPanel;
