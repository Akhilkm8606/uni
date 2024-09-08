import axios from "axios";


const instance = axios.create({
    baseURL : "https://unified-cart-server.vercel.app"
})

export default instance;