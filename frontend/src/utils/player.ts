import { Device } from "./preferences";

export type Player = {
  id: string;
  kcId: string | null;
  createdAt: string;
  updatedAt: string;
  name: string;
  lastname: string;
  license: string;
  club: string;
  favoriteDevice: Device;
  favoriteColor?: string;
};
