import { useEffect, useState } from 'react';

import { IUser } from '@erxes/ui/src/auth/types';
import Select from 'react-select';
import { __ } from 'modules/common/utils';
import { gql } from '@apollo/client';
import { queries } from '@erxes/ui/src/team/graphql';
import { useQuery } from '@apollo/client';
import React from 'react';

type Props = {
  onSelect: (value: string[] | string) => void;
  value?: string | string[];
  multi?: boolean;
  excludeUserIds: string[];
  objectId: string;
  name: string;
  isAllUsers?: boolean;
  placeholder?: string;
};

export default function SelectStructureMembers({
  objectId,
  onSelect,
  multi,
  value,
  excludeUserIds,
  name,
  isAllUsers,
  placeholder,
}: Props) {
  const queryName = isAllUsers ? 'allUsers' : 'noDepartmentUsers';
  const variables = isAllUsers ? { isActive: true } : { excludeId: objectId };

  const { loading, data } = useQuery(gql(queries[queryName]), {
    variables,
    fetchPolicy: 'network-only',
  });
  const [users, setUsers] = useState([] as IUser[]);

  useEffect(() => {
    if (!loading) {
      const filteredUsers = data[queryName].filter(
        (u) => !excludeUserIds.includes(u._id),
      );

      setUsers(filteredUsers);
    }
  }, [excludeUserIds, data, loading, queryName]);

  const options =users.map(user => ({
    value: user._id,
    label: user.details
      ? user.details.fullName || user.details.firstName || user.email
      : user.username || user.email,
    avatar: user.details ? user.details.avatar : ''
  }))

  return (
    <Select
      name={name}
      isMulti={multi}
      placeholder={placeholder}
      // label={__('Choose team members')}
      value={options.filter(o=>value?.includes(o.value))}
      onChange={onSelect}
      options={options}
    />
  );
}
