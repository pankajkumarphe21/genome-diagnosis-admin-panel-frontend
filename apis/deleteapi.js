const baseUrl = import.meta.env.VITE_HOST_API;

const deleteData = async (extra, id) => {
    console.log(id)
    try {
        const response = await fetch(`${baseUrl}/${extra}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
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

export { deleteData };