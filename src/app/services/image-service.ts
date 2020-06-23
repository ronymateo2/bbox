import { apiService } from "./api"

const IMAGEURL = 'https://k4px9ykgri.execute-api.us-east-2.amazonaws.com/prod'

export const imageService = {
    getImages(): Promise<string[]> {
        return apiService.get(IMAGEURL)
    }
}