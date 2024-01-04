import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Post } from './post.model';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './posts.actions';

export interface PostsState extends EntityState<Post> {
  error: Error | null;
  loading: boolean;
}

export const adapter = createEntityAdapter<Post>();

const initialState: PostsState = adapter.getInitialState({
  error: null,
  loading: false,
});

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({ ...state, loading: true })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadPostsSuccess, (state, { posts }) =>
    adapter.setAll(posts, { ...state, loading: false })
  )
);
