
// @ts-ignore
import axios from 'redaxios'
// https://danlevy.net/you-may-not-need-axios/#cors-example
const BASE_SVC_URL = '';
let instance: ApiService | null = null;


class ApiService {
    private baseUrl: string = BASE_SVC_URL;
    
    private getReq(url: string) {
        return axios.get(url, {
            headers: {
                'X-API-Key': import.meta.env.SERVICE_API_KEY as string
            }
        })
    }

    public getPosts({ id }: { id: string }): Promise<any> {
        return this.getReq(`${this.baseUrl}/posts/${id}`)
    }
}

if(!instance) {
    instance = new ApiService()
}

export default instance