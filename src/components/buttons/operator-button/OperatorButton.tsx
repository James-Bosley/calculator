import { FC } from "react";
import { MathOperators } from "../../../App";

import "../button.scss";

interface Props {
  type: MathOperators;
  currentOperator: MathOperators | null;
  setOperator: (operator: MathOperators | null) => void;
}

const OperatorButton: FC<Props> = ({ type, currentOperator, setOperator }) => {
  const symbols = {
    add: "+",
    subtract: "-",
    multiply: "x",
    divide: "/",
  };

  return (
    <div className="button__container">
      <button
        className={`button button--operator ${type === currentOperator ? "button--selected" : ""}`}
        type="button"
        onClick={() => setOperator(type)}
      >
        {symbols[type]}
      </button>
    </div>
  );
};

export default OperatorButton;
