export const getTokenSpotify = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    };

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', requestOptions);
        const data = await response.json();
        const Bearer = data.access_token;
        console.log('Token solicitado');
        return Bearer;
    } catch (error) {
        throw error; 
    }
}


export const getSongs = async (query, accessToken) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error('Error al realizar la búsqueda');
        }
    } catch (error) {
        throw error;
    }
};


