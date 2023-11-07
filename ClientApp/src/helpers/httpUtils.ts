import axios from 'axios';

export async function getDataFromServer(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error when executing a GET request to the address ${url} : ${error}`);
    }
}