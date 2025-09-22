const baseUrl = import.meta.env.VITE_HOST_API;

const putData = async (extra, data) => {
    console.log(data)
    try {
        const response = await fetch(`${baseUrl}/${extra}`, {
            method: 'PUT',
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
        console.error("Error updating data:", error);
    }
}

export default putData;


