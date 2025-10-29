export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{
    id: string;
    name: string;
  }>;
  created: string;
}

export interface LocationEntityVm {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residentsCount: number;
}
