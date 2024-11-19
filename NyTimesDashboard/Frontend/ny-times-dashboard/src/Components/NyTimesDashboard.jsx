import React, { useState } from "react";

const NyTimesDashboard = () => {
    const [beginDate, setBeginDate] = useState('');
    const [articles, setArticles] = useState([]);

    const handleInput = (event) => {
        setBeginDate(event.target.value);
    };

    const fetchArticles = (event) => {

        if (event) {
            event.preventDefault();
        }

        fetch(`${process.env.REACT_APP_API_ENDPOINT}?begin_date=${beginDate}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                setArticles(data.response.docs);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
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
