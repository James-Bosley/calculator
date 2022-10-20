import { FC } from "react";
import { MathOperators } from "../../../App";

import "../button.scss";

interface Props {
  type: MathOperators;
  setOperator: (operator: MathOperators | null) => void;
}

const OperatorButton: FC<Props> = ({ type, setOperator }) => {
  const symbols = {
    add: "+",
    subtract: "-",
    multiply: "x",
    divide: "/",
  };

  return (
    <div className="button__container">
      <button className="button button--operator" type="button" onClick={() => setOperator(type)}>
        {symbols[type]}
      </button>
    </div>
  );
};

export default OperatorButton;
