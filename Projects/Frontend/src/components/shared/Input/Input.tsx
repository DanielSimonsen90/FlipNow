import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

type Props<T extends Record<any, any>> = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'name'> & {
  group?: boolean;
  label?: string | boolean;
  model: T;
  name: keyof T;
  onChange?: (value: string) => void;
}

export default function Input<T extends Record<any, any>>({ group, model, name, label: labelValue, ...props }: Props<T>) {
  const [value, setValue] = useState(model[name].toString());

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
    props.onChange?.(newValue);
  }

  const input = <input type="text" value={value} {...props} name={name.toString()} onChange={onChange} />;
  const label = labelValue 
    ? <label htmlFor={props.id ?? name.toString()}>
        {typeof labelValue === 'boolean' ? formatLabel(name.toString()) : labelValue}
      </label> 
    : null;

  return group ? (
    <div className="input-group">
      {label}
      {input}
    </div>
  ) : (
    <>
      {label}
      {input}
    </>
  );
}

function formatLabel(name: string) {
  const spaceMade = name.replace(/([A-Z])/g, ' $1').toLowerCase();
  return spaceMade.charAt(0).toUpperCase() + spaceMade.slice(1);
}