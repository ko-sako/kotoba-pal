import React, { useEffect, useState } from 'react';
import { getResponse } from '../api';

const Response: React.FC = () => {
    const [response, setResponse] = useState<string>('');

    const fetchResponse = async () => {
        const result = await getResponse();
        setResponse(result.content);
    };

    useEffect(() => {
        fetchResponse();
    }, []);

    return (
        <div>
            <p>Response: {response}</p>
        </div>
    );
};

export default Response;
