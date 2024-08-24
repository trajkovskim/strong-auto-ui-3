import { SetVehicleFiltersAction } from 'context/vehicles/types';

export const SET_VEHICLE_FILTERS_ACTION = 'STRONGAUTO@SET_VEHICLE_FILTERS';

export const setVehicleFiltersAction: SetVehicleFiltersAction = (vehicleFilters) => ({
  type: SET_VEHICLE_FILTERS_ACTION,
  filters: vehicleFilters,
});
