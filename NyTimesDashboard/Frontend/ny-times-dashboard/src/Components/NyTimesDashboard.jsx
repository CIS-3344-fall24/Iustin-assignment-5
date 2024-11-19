import React, { useState } from "react";

const NyTimesDashboard = () => {
    const [beginDate, setBeginDate] = useState('');
    const [articles, setArticles] = useState([]);

    const handleInput = (event) => {
        // Validate input to match YYYYMMDD pattern
        const input = event.target.value;
        if (/^\d{0,8}$/.test(input)) {
            setBeginDate(input); // Only allow up to 8 digits
        }
    };

    const fetchArticles = (event) => {
        if (event) {
            event.preventDefault();
        }
        fetch(`${process.env.REACT_APP_API_ENDPOINT}?begin_date=${beginDate}`)
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
