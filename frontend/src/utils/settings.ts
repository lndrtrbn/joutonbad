type History = {
  at: string;
  by: string;
  attribute: string;
  oldValue: string;
  newValue: string;
};

export type Settings = {
  clubPart: number;
  history: History[];
};
