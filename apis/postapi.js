const baseUrl = import.meta.env.VITE_HOST_API;

const postData = async (extra, data) => {
    console.log(data)
    try {
        const response = await fetch(`${baseUrl}/${extra}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default postData;