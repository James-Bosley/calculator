import { FC } from "react";

interface Props {
  value: string;
  handleClick: (value: string) => void;
}

const NumberButton: FC<Props> = ({ value, handleClick }) => {
  return <div onClick={() => handleClick(value)}>{value}</div>;
};

export default NumberButton;
