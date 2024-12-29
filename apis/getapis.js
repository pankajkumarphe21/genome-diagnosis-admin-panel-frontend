const baseUrl = import.meta.env.VITE_HOST_API;

const fetchData = async (extra) => {

    try {
        const response = await fetch(`${baseUrl}/${extra}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export default fetchData;
