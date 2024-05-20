import { ReactNode, useState } from 'react';
import { ButtonType } from '../scripts/constants/enums';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

interface Props {
  text: string;
  type?: ButtonType;
  class?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function Button({ ...props }: Props) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <button
      className={`${status} ${props.class}`}
      type={props.type || ButtonType.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={props.onClick}
    >
      {props.text}
      {props.children}
    </button>
  );
}
