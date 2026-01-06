import { useContext } from 'react';
import { CreateForkliftContext } from 'src/onlineHelp/learningExperienceDrawer/context/ForkliftContext';
import {
  type LearningExperienceSubTopic,
  type LearningExperienceTopic,
  ListStyleType,
} from 'src/onlineHelp/learningExperienceStructure/utils/types';
import { PROVIDER_TYPES, type ProviderTypes } from 'src/providers/utils/constants';

import { ExternalLink } from '@components/common/ExternalLink/ExternalLink';
import { CubesIcon } from '@patternfly/react-icons';
import { TipsTopic } from '@utils/analytics/constants';
import { t } from '@utils/i18n';

import SourceMigrationSelection from '../components/SourceMigrationSelection';
import { LEARN_MORE_MIGRATING_VMS_DOCS_URL } from '../utils/constants';

import { commonMigratingVMsSubTopics } from './subTopics/commonMigratingVMsSubTopics';
import { vmWareMigratingVmsSubTopics } from './subTopics/vmWareMigratingVmsSubTopics';

const migratingVMsSubTopics = (): LearningExperienceSubTopic[] => {
  const { learningExperienceContext } = useContext(CreateForkliftContext);
  const { data, setData } = learningExperienceContext;

  const helpTopics = () => {
    switch (learningExperienceContext.data.migrationSource) {
      case PROVIDER_TYPES.vsphere:
        return vmWareMigratingVmsSubTopics();
      case PROVIDER_TYPES.openstack:
        return commonMigratingVMsSubTopics(t('Choose your OpenStack provider.'));
      case PROVIDER_TYPES.ova:
        return commonMigratingVMsSubTopics(t('Choose your Open Virtual Appliance provider.'));
      case PROVIDER_TYPES.ovirt:
        return commonMigratingVMsSubTopics(t('Choose your Red Hat Virtualization provider'));
      case PROVIDER_TYPES.openshift:
        return commonMigratingVMsSubTopics(t('Choose your OpenShift Virtualization provider.'));
      default:
        return [];
    }
  };

  return [
    {
      id: 'vm-migration-type-select',
      title: (
        <div className="forklift--learning__help-description">
          {t(`Where are you migrating your VMs from?`)}
          <SourceMigrationSelection
            key={data.migrationSource}
            selectedSource={data.migrationSource}
            setSelectedSource={(selected: ProviderTypes) => {
              setData('migrationSource', selected);
            }}
          />
        </div>
      ),
    },
    ...helpTopics(),
    {
      id: 'migration-learn-more-link',
      title: (
        <ExternalLink href={LEARN_MORE_MIGRATING_VMS_DOCS_URL} isInline>
          {t('Learn more about migrating VMs')}
        </ExternalLink>
      ),
    },
  ];
};

export const migratingVMsTopic = (): LearningExperienceTopic => ({
  description: t('Learn the best practices for seamlessly migrating your VMs.'),
  icon: <CubesIcon />,
  id: 'migrating-vms',
  subListStyleType: ListStyleType.DESCRIPTIONS,
  subTopics: migratingVMsSubTopics,
  title: t('Migrating your VMs'),
  trackingEventTopic: TipsTopic.MigratingVMs,
});
