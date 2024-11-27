import axios from 'axios';

//Replace this with your current IP
const uri = 'http://192.168.101.3:8000';


export async function standardLogin(email: string, password: string) {
    try {
        const apiUrl = uri + "/v1/auth/login"

        const data = {
            email: email,
            password: password,
        };

        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
        });

        const res = {
            status: 'success',
            data: response.data,
        }
        return res;
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};

export async function getValidatedToken(token: string) {
    try {
        const apiUrl = uri + "/v1/auth/validateToken/" + token;


        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
        });

        const res = {
            status: 'success',
            data: response.data,
        }
        return res;
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};