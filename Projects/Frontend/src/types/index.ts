export type Nullable<T> = T | null;

export type StorageOptions = {
  storage: Storage,
  key: string,
};

export type FormEvent = React.FormEvent<HTMLFormElement> & {
  target: HTMLFormElement,
}