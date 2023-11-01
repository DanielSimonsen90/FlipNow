import { Button, classNames } from 'danholibraryrjs';
import { LoginContainerProps } from './LoginContainerProps';

export default function LoggedInContainer({ user, logout, className }: LoginContainerProps) {
  return (
    <div className={classNames(className, 'logged-in')}>
      <p>You are logged in as <span>{user?.username}</span></p>
      <Button importance='secondary' onClick={logout}>Log out</Button>
    </div>
  );
}