import { useState } from 'react';
import ButtonType from '../constants/buttonTypes';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

interface Props {
  text: string;
  type?: ButtonType;
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
      className={status}
      type={props.type || ButtonType.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.text}
    </button>
  );
}
