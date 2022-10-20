import { FC } from "react";
import { MathOperators } from "../../App";

interface Props {
  type: MathOperators;
  setOperator: (operator: MathOperators | null) => void;
}

const OperatorButton: FC<Props> = ({ type, setOperator }) => {
  return <div onClick={() => setOperator(type)}>{type}</div>;
};

export default OperatorButton;
