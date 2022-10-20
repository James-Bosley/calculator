import { FC, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";

interface Props {
  currentInput: number | null;
  previousInput: number | null;
  setCurrentInput: Dispatch<SetStateAction<number>>;
}

const Display: FC<Props> = ({ currentInput, previousInput, setCurrentInput }) => {
  // Placeholder value is used to display an indermediate value of the calculation.
  const getPlaceholder = () => {
    if (currentInput === 0 && previousInput) {
      return previousInput.toString();
    }
    return "";
  };

  // Typeof "+" and "-" is number when used in an input element. As we don't want these to appear,
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
