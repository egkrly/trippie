import { useState } from 'react';

export const useRequest = async (fetchFn: Promise) => {
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(false);

  const doFetch = () => {
    fetchFn();
  };

  return {
    doFetch,
    isFetched,
    setIsFetched,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    data,
    setData,
  };
};
