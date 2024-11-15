import {useState} from "react";

const NyTimesDashboard = () => {

    const [month, setMonth] = useState(1);  // State to track the selected month (default is January, represented by 1)
    const [articles, setArticles] = useState(null); // State to store the list of articles fetched from the API

    // Handles changes in the month input field and updates the `month` state
    const handleInput = (e) => {
        setMonth(e.target.value);
    }

    // Fetches articles from the NY Times API for the selected month
    const getArticles = (e) => {
        if (e) {
            e.preventDefault();
        }

        // Making a GET request to the API with the selected month as a query parameter
        fetch(`${process.env.REACT_APP_API_ENDPOINT}?month=${month}`)
            .then((response) => {
                // Check if the response is successful, otherwise throw an error
                if (!response.ok) throw new Error("Error fetching data");
                return response.json();
            })
            .then((data) => {
                // Update the articles state with the fetched article data
                setArticles(data.response.docs);
            })
            .catch((error) => {
                // Log any errors that occur during the fetch process
                console.log(error);
            });
    };
}