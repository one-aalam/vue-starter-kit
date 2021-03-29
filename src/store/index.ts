import { createStore } from 'vuex';
import { PostStoreState, Post } from '@/commons/types'
import POSTS from '@/commons/fixtures/posts.json';
import apiService from '@/commons/services/api.service'


const initialPostStoreState: PostStoreState = {
    loading: false,
    posts: POSTS,
    selected: undefined
}

export default createStore({ 
    state: initialPostStoreState,
    mutations: {
        loadingItems(state: PostStoreState) {
            state.loading = true
            state.posts = state.posts.length ? state.posts : []
        },
        loadedItems(state: PostStoreState, { posts, page }: {posts: Post[], page: number}) {
            state.posts = page === 1 ? posts : [...state.posts, ...posts]
            state.loading = false
        },
        selectedPost(state: PostStoreState, post: Post ) {
            state.selected = post
            state.loading = false
        }
    }, 
    actions: { 
        loadItems({ commit }, payload: { id: string, page?: number }) {
            commit('loadingItems')
            apiService?.getPosts(payload).then(resp => commit('loadedItems', { posts: resp.data.posts, page: payload.page } ))
        },
        selectPost({ commit }, payload) {
            commit('selectedPost', payload)
        }
    }, 
    modules: { }
})