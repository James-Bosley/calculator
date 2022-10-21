import { FC } from "react";

import "../button.scss";

interface Props {
  value: string;
  handleClick: (value: string) => void;
}

const NumberButton: FC<Props> = ({ value, handleClick }) => {
  return (
    <div className="button__container">
      <button className="button button--number" type="button" onClick={() => handleClick(value)}>
        {value}
      </button>
    </div>
  );
};

export default NumberButton;
