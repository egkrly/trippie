'use client';

import { Accordion, Button, Flex, Group, Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import classes from './AddressWidget.module.css';
import AddNewAddress from './AddNewAddress';
import { AddressType, UserAddress } from '@/types';

const AddressWidget: FC = () => {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  const fetchAddresses = async () => {
    const response = await fetch('/api/user/addresses', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { addresses: responseAddresses } = await response.json();
      setAddresses(responseAddresses as UserAddress[]);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const emojis: Record<AddressType, string> = {
    home: '🏠',
    vacation: '⛱️',
    other: '🏘️',
  };

  const addressTypes: Record<AddressType, string> = {
    home: 'Home',
    vacation: 'Vacation',
    other: 'Other',
  };

  const items = addresses.map((item) => (
    <Accordion.Item value={'' + item.id} key={item.id} className={classes.accordion_item}>
      <Group wrap="nowrap">
        <div>
          <Text>
            {emojis[item.type]} {addressTypes[item.type]}
          </Text>
          <Text size="sm" c="dimmed" fw={400}>
            {item.country}, {item.postalCode} {item.city}, {item.street} {item.houseNumber}
          </Text>
        </div>
      </Group>
    </Accordion.Item>
  ));

  return (
    <Flex direction="column" gap="1rem">
      <Accordion chevronPosition="right" variant="contained">
        {items}
      </Accordion>
      <AddNewAddress />
    </Flex>
  );
};

export default AddressWidget;
