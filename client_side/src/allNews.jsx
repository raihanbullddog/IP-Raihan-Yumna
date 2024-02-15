import React, { useEffect, useState } from "react";
import axios, { Axios } from 'axios';
// import './assets/allNews.css'

function FetchNewsAll() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://api.thenewsapi.com/v1/news/all?api_token=DFk633Fs9IOFJDBR9o2sZvdXvjTYrA6uxirWVC0h&language=en&limit=3')
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))

    }, [])
    return (
        <div className="flex-container">
            <tbody>
                {
                    data.map((user, index) => {
                        return <tr key={index}>
                            <div className="card">
                                <img className="card-image" src={user.image_url} alt="profile picture"></img>
                                <h2 className="card-title">{user.title}</h2>
                                <p className="card-text">I{user.description}</p>
                            </div>
                            <button type="danger-button" href={user.url}>See Details</button>
                        </tr>
                    })
                }
            </tbody>
        </div >
    )
}

export default FetchNewsAll