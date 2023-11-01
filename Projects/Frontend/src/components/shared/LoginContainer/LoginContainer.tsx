import { Button, classNames } from "danholibraryrjs";
import { FormEvent } from "types";
import { LoginContainerProps } from "./LoginContainerProps";
import { useState } from "react";

export default function LoginContainer({ className, createOrFind }: LoginContainerProps) {
  const [loading, setLoading] = useState(false);
  
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    createOrFind(e.target.username.value);
  };

  return (
    <form className={classNames(className, 'login')} onSubmit={onSubmit}>
      <input type="text" name="username" placeholder="Select your username..." />
      <Button importance="primary" type="submit" disabled={loading}>{loading ? 'Logging you in...' : 'Login'}</Button>
    </form>
  );
}