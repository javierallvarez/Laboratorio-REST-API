export interface LocationApi {
  id: number | string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{
    id: string;
    name: string;
  }>;
  created: string;
}

export interface LocationsResponseApi {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: LocationApi[];
}
