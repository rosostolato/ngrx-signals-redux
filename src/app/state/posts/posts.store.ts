import { signalStore } from '@ngrx/signals';
import {
  createSelector,
  withDispatchers,
  withReducer,
  withSelectors,
} from 'ngrx-signals-redux';
import { loadPosts } from './posts.actions';
import { adapter, postsReducer } from './posts.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

export const PostsStore = signalStore(
  withReducer(postsReducer),
  withSelectors(() => ({
    posts: createSelector(selectAll),
    entities: createSelector(selectEntities),
    ids: createSelector(selectIds),
    total: createSelector(selectTotal),
  })),
  withDispatchers((dispatch) => ({
    loadPosts() {
      dispatch(loadPosts());
    },
  }))
);
