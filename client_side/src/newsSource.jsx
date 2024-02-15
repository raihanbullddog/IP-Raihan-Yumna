import React, { useEffect, useState } from "react";
import axios, { Axios } from 'axios';

function FetchSource() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://api.thenewsapi.com/v1/news/sources?api_token=DFk633Fs9IOFJDBR9o2sZvdXvjTYrA6uxirWVC0h&language=en')
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))

    }, [])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>res test</h3>
                <table>
                    <thead>
                        <tr>
                            <th>domain</th>
                            <th>category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.domain}</td>
                                    <td>{user.categories[0]}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FetchSource