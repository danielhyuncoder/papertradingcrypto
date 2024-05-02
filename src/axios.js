import axios from "axios";

const instance = axios.create({
    baseURL: "https://server-ladeadev-ladeadevs-projects.vercel.app/",
    headers: {
        password: process.env.REACT_APP_PASSWORD
    }
})

export default instance;