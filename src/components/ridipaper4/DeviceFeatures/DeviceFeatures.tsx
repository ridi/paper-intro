import React from 'react';
import { DeviceColors } from './DeviceColors';
import { DeviceOrientations } from './DeviceOrientations';
import { DeviceWaterproof } from './DeviceWaterproof';

export const DeviceFeatures = (): JSX.Element => (
  <>
    <DeviceWaterproof />
    <DeviceOrientations />
    <DeviceColors />
  </>
);
