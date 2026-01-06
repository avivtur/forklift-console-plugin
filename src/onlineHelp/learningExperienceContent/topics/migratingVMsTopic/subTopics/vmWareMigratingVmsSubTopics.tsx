import { t } from 'i18next';
import {
  type LearningExperienceSubTopic,
  ListStyleType,
} from 'src/onlineHelp/learningExperienceStructure/utils/types';

import { additionalSettingsSubTopic } from './additionalSettingsSubTopic';
import { createPlanSubTopic } from './createPlanSubTopic';
import { goToPlanSubTopic } from './goToPlanSubTopic';
import { planDetailsSubTopic } from './planDetailsSubTopic';
import { reviewSubTopic } from './reviewSubTopic';
import { selectNetworkMapSubTopic } from './selectNetworkMapSubTopic';
import { selectStorageMapSubTopic } from './selectStorageMapSubTopic';
import { selectVMsSubTopic } from './selectVMsSubTopic';
import { selectVMWareMigrationTypeSubTopic } from './selectVMWareMigrationTypeSubTopic';

export const vmWareMigratingVmsSubTopics = (): LearningExperienceSubTopic[] => [
  {
    expandable: true,
    id: 'migration-steps',
    subListStyleType: ListStyleType.DECIMAL,
    subTopics: () => [
      goToPlanSubTopic(),
      createPlanSubTopic(),
      planDetailsSubTopic(t('Choose your VMware provider.')),
      selectVMsSubTopic(),
      selectNetworkMapSubTopic(),
      selectStorageMapSubTopic(),
      selectVMWareMigrationTypeSubTopic(),
      additionalSettingsSubTopic(),
      reviewSubTopic(),
    ],
  },
];
