import { VehiclesState } from 'context/vehicles';
import { VehicleColor, VehicleCondition, VehicleDriveType, VehicleFuelType, VehicleTransmission } from 'generated';
import { TranslationFunction } from 'hooks/useTranslation';

export const convertMakesToOptions = (makes: VehiclesState['makes']) => {
  return Object.entries(makes ?? {}).map(([, make]) => ({ value: make.make, label: make.make })) ?? [];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertMakeModelsToOptions = (makes: VehiclesState['makes'], values: any) => {
  return makes?.[values.make]?.models?.map((model) => ({ value: model.model, label: model.model })) ?? [];
};

export const convertVehicleConditionsToOptions = (t: TranslationFunction) =>
  Object.values(VehicleCondition).map((condition) => ({
    value: condition,
    label: t(`vehicleCondition.${condition}`),
  }));

export const convertVehicleTransmissionsToOptions = (t: TranslationFunction) =>
  Object.values(VehicleTransmission).map((transmission) => ({
    value: transmission,
    label: t(`vehicleTransmission.${transmission}`),
  }));

export const convertVehicleDriveTypesToOptions = (t: TranslationFunction) =>
  Object.values(VehicleDriveType).map((driveType) => ({
    value: driveType,
    label: t(`vehicleDriveType.${driveType}`),
  }));

export const convertVehicleFuelTypesToOptions = (t: TranslationFunction) =>
  Object.values(VehicleFuelType).map((fuelType) => ({
    value: fuelType,
    label: t(`vehicleFuelType.${fuelType}`),
  }));

export const convertVehicleColorsToOptions = (t: TranslationFunction) =>
  Object.values(VehicleColor).map((color) => ({
    value: color,
    label: t(`color.${color}`),
  }));
