import axios from 'axios';

export default async function handler(req, res) {
    const apiUrl = 'https://reqres.in/api/users'; 

    try {
        const response = await axios.get(apiUrl);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
}