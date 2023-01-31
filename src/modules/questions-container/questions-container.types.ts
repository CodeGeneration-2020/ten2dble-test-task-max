export type TInitValues = {
  [key: string]: string;
}

export type TErrors = {
  [key: string]: boolean;
}

export type TState = {
  inputValues: TInitValues;
  errors: TErrors;
  isConfirmDisabled: boolean;
}

