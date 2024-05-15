import { Alert, TextField } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputField {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  // everything else passed goes to array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [leftovers: string]: any;
}

const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputField) => {
  return (
    <>
      <TextField
        label={label}
        placeholder={name}
        {...props}
        {...register(name, registerOptions)}
        required={!!error}
      />
      {error?.message && (
        <Alert severity="warning">
          Title is needed in order to create note.
        </Alert>
      )}
    </>
  );
};

export default TextInputField;
