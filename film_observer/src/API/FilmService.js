import axios from "axios";

const headers = {
    'X-API-KEY': '052b09ab-49fa-4dd5-a052-2cf6e3b0ae32',
    'Content-Type': 'application/json',
}

export default class FilmService {
    static async getTop (topName, page = 1) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${topName}&page=${page}`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmByFilter (paramString, page) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?${paramString}&page=${page}`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmById (id) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
            headers: headers,
        });
        return response;
    }

    static async getPersonById (id) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/staff/${id}`, {
            headers: headers,
        });
        return response;
    }

    static async getStaffByFilmId (id) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
            headers: headers,
        });
        return response;
    }

    static async getFilters () {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/filters`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmByKeyWord (keyword, page) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmFacts (id) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/facts`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmAwards (id) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/awards`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmReviews (id, page, order) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/reviews?page=${page}&order=${order}`, {
            headers: headers,
        });
        return response;
    }

    static async getFilmImages (id, page, type) {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=${type}&page=${page}`, {
            headers: headers,
        });
        return response;
    }
}