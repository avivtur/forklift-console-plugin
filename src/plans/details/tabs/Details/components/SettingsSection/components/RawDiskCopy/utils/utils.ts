import { ADD, REPLACE } from '@components/ModalForm/utils/constants';
import { PlanModel, type V1beta1Plan } from '@kubev2v/types';
import { k8sPatch } from '@openshift-console/dynamic-plugin-sdk';

import type { EnhancedPlan } from '../../../utils/types';

export const getDiskRawCopy = (resource: V1beta1Plan): boolean | undefined =>
  (resource as EnhancedPlan)?.spec?.skipGuestConversion;

export const onConfirmDiskRawCopy = async ({
  newValue,
  resource,
}: {
  resource: V1beta1Plan;
  newValue: boolean;
}): Promise<V1beta1Plan> => {
  const current = getDiskRawCopy(resource);
  const op = current === undefined ? ADD : REPLACE;

  const updated = await k8sPatch({
    data: [
      {
        op,
        path: '/spec/skipGuestConversion',
        value: newValue ?? undefined,
      },
    ],
    model: PlanModel,
    resource,
  });

  return updated;
};
