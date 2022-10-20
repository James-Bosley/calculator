import { FC } from "react";

interface Props {
  type: string;
  action: () => void;
}

const ActionButton: FC<Props> = ({ type, action }) => {
  return <div onClick={() => action()}>{type}</div>;
};

export default ActionButton;
