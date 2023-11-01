import { Button } from 'danholibraryrjs';
import { Props } from './ToggleButtonTypes';

export default function ToggleButton({ text, state, setState, ...props }: Props) {
  const value = (state ? 'Hide' : 'Show') + ` ${text}`;
  
  return (
    <Button onClick={() => setState(v => !v)} {...props}>
      {value}
    </Button>
  );
}