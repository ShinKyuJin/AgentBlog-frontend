import { useState } from "react";

const useInput = (
  text: string
): [
  {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [value, setValue] = useState<string>(text);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [{ value, onChange }, setValue];
};

export default useInput;
/*
[
  {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  React.Dispatch<React.SetStateAction<boolean>>
]
 */
