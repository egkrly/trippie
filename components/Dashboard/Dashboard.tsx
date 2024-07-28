import { Flex } from '@mantine/core';
import { FC } from 'react';
import AddressWidget from '../AddressWidget/AddressWidget';

const Dashboard: FC = () => {
  return (
    <Flex w="100%" p="1rem" gap="1rem">
      <Flex flex={1}>Hello</Flex>
      <Flex w="300px" align="flex-end">
        <AddressWidget />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
