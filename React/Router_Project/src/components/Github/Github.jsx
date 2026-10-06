import React, { useEffect, useState } from 'react'

export default function Github() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://api.github.com/users/adhikari-arpan')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch(() => setError(true))
    }, [])

    if (error) {
        return <div className="text-center m-4 bg-gray-600 text-white p-4 text-2xl">Could not load GitHub data.</div>
    }

    if (!data) {
        return <div className="text-center m-4 bg-gray-600 text-white p-4 text-2xl">Loading...</div>
    }

    return (
        <div className="text-center m-4 bg-gray-600 text-white p-4 text-2xl flex flex-col items-center gap-4">
            <img src={data.avatar_url} alt="GitHub profile picture" width={200} className="rounded-full" />
            <p>{data.name || data.login}</p>
            <p>Followers: {data.followers} · Public Repos: {data.public_repos}</p>
        </div>
    );
}
