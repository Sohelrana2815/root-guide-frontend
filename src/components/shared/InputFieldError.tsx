import {
  getInputFieldError,
  IInputFieldErrorState,
} from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
  field: string;
  state: IInputFieldErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  // console.log({
  //   state,
  //   field,
  // });
  if (getInputFieldError(field, state)) {
    return (
      <FieldDescription className="text-red-600">
        {getInputFieldError(field, state)}
      </FieldDescription>
    );
  }
  return null;
};
export default InputFieldError;
