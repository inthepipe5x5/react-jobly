import axios from "axios";

export const PEXELS_API_URL = "https://api.pexels.com/v1/";
export const PEXELS_API_KEY = import.meta.process.env.PEXELS_API_KEY ?? "secret-key";

if (PEXELS_API_KEY === 'secret-key') {
    throw new Error("PEXELS_API_KEY is not defined. Please set it in your environment variables.");
}

export const createPexelsClient = () => axios.create({
    baseURL: PEXELS_API_URL,
    headers: {
        Authorization: PEXELS_API_KEY,
        "Content-Type": "application/json",
    },
    timeout: 10000,
    validateStatus: (status) => {
        return status >= 200 && status < 500; // Default
    },
});

const client = createPexelsClient();

const currentQuery = new Map({
    page: 1,
    query: "",
    endpoint: "search",
});

const updateCurrentQuery = (updatedQuery) => {
    //handle new query
    if (updatedQuery.query !== currentQuery.query || updatedQuery.endpoint !== currentQuery.endpoint) {
        currentQuery.page = 1; // Reset page if query or endpoint changes
        currentQuery.endpoint = updatedQuery.endpoint ?? "search"; // Reset page if query or endpoint changes
        currentQuery.query = updatedQuery.query ?? ""; // Reset page if query or endpoint changes
    } //update page
    else if (updatedQuery.page !== currentQuery.page) {
        currentQuery.page = updatedQuery.page;
    }

    console.log("Updated current query:", JSON.stringify(this.currentQuery, null, 4));
    return;
};

export const getPhotos = async ({
    query,
    endpoint = "search",
    page = 1,
}) => {
    try {

        updateCurrentQuery({ query: query ?? "company", endpoint, page });
        const response = await client.get("search", {
            params: {
                query: query ?? currentQuery?.query ?? "company",
                page,
                per_page: 10,
            },
        });
        return response.data.photos;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
};
