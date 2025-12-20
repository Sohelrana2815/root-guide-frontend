/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputFieldErrorState {
  success: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}

export const getInputFieldError = (
  fieldName: string,
  state: IInputFieldErrorState
) => {
  if (state && state.errors) {
    const error = state.errors.find((err: any) => err.field === fieldName);
    return error ? String(error.message) : null;
  } else {
    return null;
  }
};
