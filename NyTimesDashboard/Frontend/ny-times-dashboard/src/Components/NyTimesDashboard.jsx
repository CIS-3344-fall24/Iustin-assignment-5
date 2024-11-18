import React, { useState } from "react";

const NyTimesDashboard = () => {
    const [beginDate, setBeginDate] = useState('');
    const [articles, setArticles] = useState(null);

    const handleInput = (event) => {
        setBeginDate(event.target.value);
    };

    const fetchArticles = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}?q=${beginDate}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })

            .then((response) => {
                if (!response.ok) throw new Error(`Error fetching data`);
                return response.json();
            })
            .then((data) => {
                setArticles(data.response.docs);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <div>
            <h1>NY Times Articles</h1>
            <form>
                <input
                    type="text"
                    name="begin_date"
                    id="begin_date"
                    placeholder="YYYYMMDD"
                    onChange={handleInput}
                />
                <button onClick={fetchArticles}>Search</button>
            </form>

            {articles && (
                <div>
                    {articles.map((article, index) => (
                        <div key={index}>
                            <h2>{article.headline.main}</h2>
                            <p>{article.abstract}</p>
                            <p>{article.source}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NyTimesDashboard;
