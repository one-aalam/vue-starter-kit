
// @ts-ignore
import axios from 'redaxios'
// https://danlevy.net/you-may-not-need-axios/#cors-example
const BASE_SVC_URL = 'https://listen-api.listennotes.com/api/v2';
let instance: ListenNotesService | null = null;


class ListenNotesService {
    private baseUrl: string = BASE_SVC_URL;
    
    private getReq(url: string) {
        return axios.get(url, {
            headers: {
                'X-ListenAPI-Key': import.meta.env.VITE_LISTEN_API_KEY as string
            }
        })
    }

    public getTopPodcasts({ id, page }: { id: number, page: number } = { id: 93, page: 1 }): Promise<any> {
        return this.getReq(`${this.baseUrl}/best_podcasts?genre_id=${id}&page=${page}&region=us&safe_mode=0`)
    }

    public getPodcast({ id }: { id: string }): Promise<any> {
        return this.getReq(`${this.baseUrl}/podcasts/${id}?sort=recent_first`)
    }

    public getPodcastGenres(): Promise<any> {
        return this.getReq(`${this.baseUrl}/podcasts/genres?top_level_only=1`)
    }
}

if(!instance) {
    instance = new ListenNotesService()
}

export default instance