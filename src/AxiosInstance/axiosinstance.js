import axios from "axios";

//API instance
const instance = axios.create({
    baseURL: "https://project-vehiclecareplatform-backend.onrender.com/",
})

export default instance;