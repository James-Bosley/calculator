import { FC, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";

import "./display.scss";

interface Props {
  currentInput: number | null;
  setCurrentInput: Dispatch<SetStateAction<number | null>>;
  result: number | null;
}

const Display: FC<Props> = ({ currentInput, result, setCurrentInput }) => {
  // Placeholder value is used to display the result of a calculation.
  const getPlaceholder = () => {
    if (result !== null) {
      if (Number.isInteger(result)) {
        return result.toString();
      } else {
        return result.toFixed(2).toString();
      }
    }
    return "";
  };

  // Typeof "+" is number when used in an input element. As we don't want these to appear,
  // in the input field, the default behaviour is overridden.
  const handleBeforeInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.nativeEvent.data === "+" || e.nativeEvent.data === "-") {
      e.preventDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(Number(e.target.value));
  };

  return (
    <div className="display">
      <input
        autoFocus
        type="number"
        className="display__input"
        value={currentInput || ""}
        placeholder={getPlaceholder()}
        onChange={handleChange}
        onBeforeInput={handleBeforeInput}
      />
    </div>
  );
};

export default Display;
