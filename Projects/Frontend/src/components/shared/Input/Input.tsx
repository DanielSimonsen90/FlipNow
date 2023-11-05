import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

type Props<T extends object> = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> & {
  model: T;
  name: keyof T;

  label?: string | boolean;
  group?: boolean;
  errorMessage?: string;
}

export default function Input<T extends object>({ 
  name, model, group, errorMessage,
  label: labelAttr, 
  ...props 
}: Props<T>) {
  const labelValue = typeof labelAttr === 'boolean' ? formatLabel(name.toString()) : labelAttr;
  const [value, setValue] = useState(model[name]?.toString());

  const input = <input id={`input-${name.toString()}`}
    type={typeof (model[name])}
    placeholder={model[name]?.toString()} 
    value={value} onChange={e => setValue(e.target.value)}
    {...props}
  />;

  const label = labelValue
    ? <label htmlFor={`input-${name.toString()}`}>
        {typeof labelValue === 'boolean' ? formatLabel(name.toString()) : labelValue}
      </label>
    : null;

  const children = (<>
    {label}
    {input}
    {errorMessage && <span className="error">{errorMessage}</span>}
  </>);

  return group ? <div className="input-group">{children}</div> : <>{children}</>;
}

function formatLabel(name: string) {
  const spaceMade = name.replace(/([A-Z])/g, ' $1').toLowerCase();
  return spaceMade.charAt(0).toUpperCase() + spaceMade.slice(1);
}