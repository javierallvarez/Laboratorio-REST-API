import { LocationApi } from './location.api-model';
import { Location, LocationEntityVm } from './location.vm';

export const mapLocationFromApiToVm = (location: LocationApi): Location => ({
  id: location.id.toString(),
  name: location.name,
  type: location.type,
  dimension: location.dimension,
  residents: location.residents,
  created: location.created,
});

export const mapLocationFromApiToEntityVm = (location: LocationApi): LocationEntityVm => ({
  id: location.id.toString(),
  name: location.name,
  type: location.type,
  dimension: location.dimension,
  residentsCount: location.residents.length,
});
