'use client';

import { Accordion, Button, Flex, Text } from '@mantine/core';
import { DatePicker, DatePickerInput, DateTimePicker } from '@mantine/dates';
import { FC, useState } from 'react';
import AirportAutocomplete from './AirportAutocomplete';

// TODO: Add switch option to departure / arrival
// TODO: Add icon to inputs

const PlaneTicketSearch: FC = () => {
  const [formState, setFormState] = useState({
    fromAirport: null,
    toAirport: null,
    fromDate: null,
    toDate: null,
  });

  const setFormStateValue = (key: string) => (value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const setDateFormStateValue = (key: string) => (value: Date) => {
    const year = value.getFullYear().toString().substring(2);
    const monthNumber = value.getMonth() + 1;
    const month = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    const dayNumber = value.getDate();
    const day = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;

    const newValue = year + month + day;

    setFormStateValue(key)(newValue);
  };

  const onSearchClick = () => {
    if (!formState.fromAirport || !formState.toAirport) {
      return;
    }

    let url = `https://www.skyscanner.com/transport/flights/${formState.fromAirport}/${formState.toAirport}`;

    if (formState.fromDate) {
      url += '/' + formState.fromDate;
    }

    if (formState.toDate) {
      url += '/' + formState.toDate;
    }

    window.open(url, '_blank');
  };

  return (
    <Accordion chevronPosition="right" variant="contained" w="100%">
      <Accordion.Item value="" p="1rem">
        <Flex gap="0.5rem" direction="column">
          <Text>Search Flights</Text>
          <AirportAutocomplete type="departure" onChange={setFormStateValue('fromAirport')} />
          <AirportAutocomplete type="arrival" onChange={setFormStateValue('toAirport')} />
          <DatePickerInput
            placeholder="Departure date"
            valueFormat="MMMM D, YYYY"
            onChange={setDateFormStateValue('fromDate')}
            minDate={new Date()}
          />
          <DatePickerInput
            placeholder="Arrival date"
            valueFormat="MMMM D, YYYY"
            onChange={setDateFormStateValue('toDate')}
            minDate={new Date()}
          />
          <Button onClick={onSearchClick}>Search flights</Button>
        </Flex>
      </Accordion.Item>
    </Accordion>
  );
};

export default PlaneTicketSearch;
