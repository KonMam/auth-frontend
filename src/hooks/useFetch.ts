import { useState, useEffect } from 'react';
import { TApiResponse } from '../types/types';


export const useFetch = <T extends any>(endpoint: string): TApiResponse<T | undefined> => {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAPIData = async () => {
      try {
        const apiResponse = await fetch(`/api${endpoint}`)

        setStatus(apiResponse.status)
        setStatusText(apiResponse.statusText)
        
        const json = await apiResponse.json()
        setData(json)

      } catch (error) {
        setError(error)
      }

      setLoading(false)
    };

    getAPIData()
  }, []);

  return { status, statusText, data, error, loading };
};