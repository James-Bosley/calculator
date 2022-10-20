import { FC } from "react";
import { ActionTypes } from "../../../App";

import "../button.scss";

interface Props {
  type: ActionTypes;
  action: () => void;
}

const ActionButton: FC<Props> = ({ type, action }) => {
  const symbols = {
    c: "C",
    ce: "CE",
    backspace: "<-",
    evaluate: "=",
  };

  return (
    <div className="button__container">
      <button className="button button--action" type="button" onClick={() => action()}>
        {symbols[type]}
      </button>
    </div>
  );
};

export default ActionButton;
