export type Nullable<T> = T | null;
export type NonNullable<T> = 
  T extends null ? never : 
  T extends undefined ? never : 
  T;

export type StorageOptions = {
  storage: Storage,
  key: string,
};

export type FormEvent = React.FormEvent<HTMLFormElement> & {
  target: HTMLFormElement,
}

export type Guid = string;
export type TimeSpan = object;