import { Button, classNames } from "danholibraryrjs";
import { FormEvent } from "types";
import { LoginContainerProps } from "./LoginContainerProps";
import { useRef, useState } from "react";
import { useConnectionHub } from "providers/ConnectionHubProvider";

export default function LoginContainer({ className, dispatch }: LoginContainerProps) {
  const [loading, setLoading] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const connection = useConnectionHub();
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    connection.on('userLoggedIn', succeeded => {
      if (succeeded) return; 
      
      setLoading(false);
      usernameInputRef.current?.focus();
    });

    setLoading(true);
    dispatch('login', e.target.username.value, connection.connectionId);
  };

  return (
    <form className={classNames(className, 'login')} onSubmit={onSubmit}>
      <input ref={usernameInputRef} type="text" name="username" placeholder="Select your username..." />
      <Button importance="primary" type="submit" disabled={loading}>{loading ? 'Logging you in...' : 'Login'}</Button>
    </form>
  );
}