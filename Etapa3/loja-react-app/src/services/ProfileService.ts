import Constants from "expo-constants";

const { apiUrl } = Constants.expoConfig?.extra ||  {};

export async function requestProfile(token: string): Promise<any> {
    try {
        const response = await fetch(`${apiUrl}/api/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        let data = await response.json();
        if (data.image == null) {
            data.image = `${apiUrl}/uploads/placeholder.png`;
        }
        return data;
    } 
    catch (error) {
        console.log(error);
        return Promise.reject('Erro ao obter perfil');
    }
}