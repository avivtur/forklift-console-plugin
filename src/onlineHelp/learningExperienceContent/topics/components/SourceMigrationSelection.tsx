import { type FC, useState } from 'react';
import { PROVIDER_TYPES, type ProviderTypes } from 'src/providers/utils/constants';

import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
} from '@patternfly/react-core';

import { MigrationSourceTypeLabels } from '../utils/constants';

type SourceMigrationSelectionProps = {
  selectedSource: ProviderTypes;
  setSelectedSource: (source: ProviderTypes) => void;
};

const SourceMigrationSelection: FC<SourceMigrationSelectionProps> = ({
  selectedSource,
  setSelectedSource,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (_event: React.MouseEvent | undefined, value: string | number | undefined) => {
    setIsOpen(false);
    setSelectedSource(value as ProviderTypes);
  };

  return (
    <div className="pf-v6-u-ml-lg pf-v6-u-mt-md">
      <Dropdown
        isOpen={isOpen}
        onSelect={onSelect}
        onOpenChange={(open: boolean) => {
          setIsOpen(open);
        }}
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle
            ref={toggleRef}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            isExpanded={isOpen}
          >
            {MigrationSourceTypeLabels[selectedSource]}
          </MenuToggle>
        )}
        ouiaId="sourceTypeDropdown"
        shouldFocusToggleOnSelect
      >
        <DropdownList>
          <DropdownItem value={PROVIDER_TYPES.vsphere}>
            {MigrationSourceTypeLabels[PROVIDER_TYPES.vsphere]}
          </DropdownItem>
          <DropdownItem value={PROVIDER_TYPES.openshift}>
            {MigrationSourceTypeLabels[PROVIDER_TYPES.openshift]}
          </DropdownItem>
          <DropdownItem value={PROVIDER_TYPES.openstack}>
            {MigrationSourceTypeLabels[PROVIDER_TYPES.openstack]}
          </DropdownItem>
          <DropdownItem value={PROVIDER_TYPES.ova}>
            {MigrationSourceTypeLabels[PROVIDER_TYPES.ova]}
          </DropdownItem>
          <DropdownItem value={PROVIDER_TYPES.ovirt}>
            {MigrationSourceTypeLabels[PROVIDER_TYPES.ovirt]}
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
};

export default SourceMigrationSelection;
