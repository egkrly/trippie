import { Flex } from '@mantine/core';
import { FC } from 'react';
import { AddressWidget } from '../AddressWidget';
import { PlaneTicketSearch } from '../PlaneTicketSearch';

const Dashboard: FC = () => {
  return (
    <Flex w="100%" p="1rem" gap="1rem">
      <Flex flex={1}>Hello</Flex>
      <Flex w="300px" align="flex-end" gap="1rem" direction="column">
        <AddressWidget />
        <PlaneTicketSearch />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
