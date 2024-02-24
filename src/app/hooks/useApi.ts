import { useState } from 'react';
import {extractToken} from "@/lib/helpers.js"

const useApi = <T>(url: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null | unknown>(null);
    const [response, setResponse] = useState<Response| null>(null);

    const fetchData = async (data: T, method: string = "GET") => {
        setIsLoading(true);
        try {
            const token = await extractToken();
            const response = await fetch(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    method: method,
                    body: JSON.stringify({...data})
                }
            );
            console.log(response, 'response')
            setResponse(response);
            setError(null);
        } catch (error: unknown) {
            setError(error);
            setResponse(null);

        } finally {
            setIsLoading(false);
        }
  };
    return { fetchData, isLoading, error, response };
};

export default useApi;