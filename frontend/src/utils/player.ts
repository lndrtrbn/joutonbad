import { Device } from "./preferences";

export type Player = {
  id: string;
  active?: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  lastname: string;
  license: string;
  club: string;
  favoriteDevice: Device;
  favoriteColor?: string;
};
