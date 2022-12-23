import { FormControl } from "../styles/textField.style";

const TextField = ({
  height,
  label,
  border,
  value,
  type,
  onChange,
  placeholder,
  name,
  pd,
  id,
}) => {
  return (
    <FormControl height={height} pd={pd}>
      <p>
        <label>{label}</label>
      </p>
      <input
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </FormControl>
  );
};

export default TextField;
