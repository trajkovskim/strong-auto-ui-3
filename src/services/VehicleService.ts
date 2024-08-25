import env from 'env';
import { VehicleApi } from 'generated';
import { baseConfiguration } from 'services/api';
import { MOCK_VEHICLE_API } from 'services/MockVehicleService';

const AXIOS_VEHICLE_API = new VehicleApi(baseConfiguration);

const VEHICLE_API = env.USE_MOCK === 'true' ? MOCK_VEHICLE_API : AXIOS_VEHICLE_API;

export const searchVehicles = (...params: Parameters<typeof VEHICLE_API.searchVehicleEntries>) =>
  VEHICLE_API.searchVehicleEntries(...params).then((response) => response);

export const getVehicleEntry = (...params: Parameters<typeof VEHICLE_API.getVehicleEntry>) =>
  VEHICLE_API.getVehicleEntry(...params).then((response) => response);

export const getVehicleMakeEntries = (...params: Parameters<typeof VEHICLE_API.getVehicleMakeEntries>) =>
  VEHICLE_API.getVehicleMakeEntries(...params).then((response) => response);

export const getVehicleMakeEntry = (...params: Parameters<typeof VEHICLE_API.getVehicleMakeEntry>) =>
  VEHICLE_API.getVehicleMakeEntry(...params).then((response) => response);
