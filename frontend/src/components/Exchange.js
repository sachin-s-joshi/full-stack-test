import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Exchange(props) {

    const [x, setX] = useState('Not Found');

    useEffect(() => {

        async function fetchExchange() {
            try {
                var apis = `http://localhost:4000/exchange?coin=${props.id}&symbol=${props.symbol}&currency=${props.currency}`
                var res = await axios.get(apis)
                console.log(res.data);
                setX(res.data)
            }
            catch {
                setX('Encountered an issue')
            }

        }

        fetchExchange();
    }, [setX, props])

    return (
        <td>{x}</td>
    )

}

export default Exchange;