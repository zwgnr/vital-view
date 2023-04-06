export type Stats = {
  id: number;
  name: string;
  stat: number;
  unit: string | null;
  change: string;
  changeType?: string;
  dataset: number[];
};

export type HeatMapData = {
  name: string;
  data: number[];
};
