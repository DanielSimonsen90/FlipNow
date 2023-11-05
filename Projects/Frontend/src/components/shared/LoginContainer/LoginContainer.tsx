import { useRef } from "react";
import { Button, classNames } from "danholibraryrjs";

import { FormEvent } from "types";
import { useConnectionHub } from "providers/ConnectionHubProvider";
import { LoginContainerProps } from "./LoginContainerProps";

const LoginMessage = 'Logging you in...';

export default function LoginContainer({ className, dispatch, loggingIn, setLoggingIn }: LoginContainerProps) {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const connection = useConnectionHub();
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    connection.on('userLoggedIn', succeeded => {
      if (succeeded) return; 
      
      setLoggingIn(false);
      usernameInputRef.current?.focus();
    });

    setLoggingIn(true);
    dispatch('login', e.target.username.value);
  };

  return (
    <form className={classNames(className, 'login')} onSubmit={onSubmit}>
      <input ref={usernameInputRef} type="text" name="username" placeholder={loggingIn ? LoginMessage : 'Select your username...'} disabled={loggingIn} />
      <Button importance="primary" type="submit" disabled={loggingIn}>{loggingIn ? LoginMessage : 'Login'}</Button>
    </form>
  );
}