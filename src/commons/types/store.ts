import { Post } from '.'

export interface PostStoreState {
    loading: boolean,
    posts: Post[],
    selected?: Post
}