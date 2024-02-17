import { Dispatch, ReactNode, SetStateAction } from "react";

export type ProviderProps = {
  children?: ReactNode;
};

export type ContextData<T> = [T, Dispatch<SetStateAction<T>>];
