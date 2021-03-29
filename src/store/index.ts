import { createStore } from 'vuex';
// import { PodcastStoreState, Podcast, PodcastEpisode, PodcastPageRequest } from '@/commons/types'
import PODCASTS from '@/commons/fixtures/podcasts.json';
import listenNotesService from '@/commons/services/listen-notes.service'


const initialPodcastStoreState: PodcastStoreState = {
    loading: false,
    podcasts: [],
    selected: undefined
}

export default createStore({ 
    state: initialPodcastStoreState,
    mutations: {
        loadingItems(state: PodcastStoreState) {
            state.loading = true
            state.podcasts = state.podcasts.length ? state.podcasts : []
        },
        loadedItems(state: PodcastStoreState, { podcasts, page }: PodcastPageRequest) {
            state.podcasts = page === 1 ? podcasts : [...state.podcasts, ...podcasts]
            state.loading = false
        },
        selectedPost(state: PodcastStoreState, episode: PodcastEpisode ) {
            state.selected = episode
            state.loading = false
        }
    }, 
    actions: { 
        loadItems({ commit }, payload: { id: number, page: number}) {
            commit('loadingItems')
            listenNotesService?.getTopPodcasts(payload).then(resp => commit('loadedItems', { podcasts: resp.data.podcasts, page: payload.page } ))
            // setTimeout(() => {
            //     commit('loadedItems', { podcasts: PODCASTS.podcasts, page: payload.page })
            // }, 1000)
        },
        selectPodcastEpisode({ commit }, payload) {
            commit('selectedPost', payload)
        }
    }, 
    modules: { }
})