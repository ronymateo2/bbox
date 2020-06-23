import { apiService } from "./api"

const IMAGEURL = '/api/prod'

export const imageService = {
    getImages(): Promise<string[]> {
        return apiService.get(IMAGEURL)
    }
}   