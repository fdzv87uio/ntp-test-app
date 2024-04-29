import axios from "axios";

export async function fetchApiData() {
    try {
        let response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}
