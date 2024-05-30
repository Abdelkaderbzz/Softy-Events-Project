export interface inputFieldProps {
  type: string;
  pHolderValue: string;
  labelValue: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  classes: string;
  errorValue: string | undefined;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
