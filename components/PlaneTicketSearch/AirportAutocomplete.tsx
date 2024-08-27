import { Airport } from '@/types';
import { Autocomplete, Badge, Loader } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { FC, useState } from 'react';

const airportToString = (airport: Airport) => {
  let countryName = airport.country_name.toLowerCase();
  countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

  return airport.code + ', ' + airport.city_name + ', ' + airport.name + ', ' + countryName;
};

const AirportAutocomplete: FC<{
  type: 'departure' | 'arrival';
  onChange: (code: string) => void;
}> = ({ type, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState<Airport[]>(null);
  const [selectedAirport, setSelectedAirport] = useState<Airport>(null);
  const airportList = airports?.length ? airports.map(airportToString) : null;

  const fetchAirports = async (term: string) => {
    // TODO: Create an api call fn, or maybe implement Axios
    const response = await fetch('/api/user/airports?term=' + term, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { airports: responseAirports } = await response.json();
      setAirports(responseAirports as Airport[]);
    }

    setLoading(false);
  };

  const onInputChange = useDebouncedCallback(async (newValue: string) => {
    const listIndex = airportList?.indexOf(newValue);

    // User selected a new airport and autocomplete field filled out the field
    if (typeof listIndex === 'number' && listIndex > -1) {
      setSelectedAirport(airports[listIndex]);
      setAirports(null);
      onChange(airports[listIndex].code);
    } else {
      // Search for airport list
      setLoading(true);
      fetchAirports(newValue);
    }
  }, 300);

  return (
    <>
      <Autocomplete
        placeholder={type === 'arrival' ? 'Arrival' : 'Departure'}
        onChange={onInputChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        data={airportList}
      />
      {selectedAirport && (
        <Badge onClick={() => setSelectedAirport(null)}>{airportToString(selectedAirport)}</Badge>
      )}
    </>
  );
};

export default AirportAutocomplete;
