import { ButtonProps } from "danholibraryrjs";
import { Dispatch, SetStateAction } from "react";

export type Props = ButtonProps & {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
  text: string
}