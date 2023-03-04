export interface IFormikProps {
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
  form: {
    touched: { [field: string]: boolean };
    errors: { [field: string]: string };
    values: { [field: string]: any };
    setFieldValue: (field: string, value: any) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    dirty: boolean;
    isValid: boolean;
    status?: any;
  };
  meta: {
    touched: boolean;
    error?: string;
  };
}
