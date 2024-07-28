'use client';

import { Accordion, Button, Flex, Group, Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import classes from './AddressWidget.module.css';
import AddNewAddress from './AddNewAddress';

const AddressWidget: FC = () => {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    const response = await fetch('/api/user/addresses', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { addresses: responseAddresses } = await response.json();
      setAddresses(responseAddresses);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const emojis = {
    home: '🏠',
    vacation: '⛱️',
    other: '🏘️',
  };

  const addressTypes = {
    home: 'Home',
    vacation: 'Vacation',
    other: 'Other',
  };

  const items = addresses.map((item) => (
    <Accordion.Item value={item.id} key={item.id} className={classes.accordion_item}>
      <Group wrap="nowrap">
        <div>
          <Text>
            {emojis[item.place_type]} {addressTypes[item.place_type]}
          </Text>
          <Text size="sm" c="dimmed" fw={400}>
            {item.country}, {item.postal_code} {item.city}, {item.street} {item.house_number}
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
