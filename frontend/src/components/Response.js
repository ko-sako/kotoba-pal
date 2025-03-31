import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getResponse } from '../api';
const Response = () => {
    const [response, setResponse] = useState('');
    const fetchResponse = async () => {
        const result = await getResponse();
        setResponse(result.content);
    };
    useEffect(() => {
        fetchResponse();
    }, []);
    return (_jsx("div", { children: _jsxs("p", { children: ["Response: ", response] }) }));
};
export default Response;
