import { signalStore, withHooks } from '@ngrx/signals';
import {
  createSelector,
  withDispatchers,
  withEffects,
  withReducers,
  withSelectors,
} from 'ngrx-signals-redux';
import { loadPosts } from './posts.actions';
import * as postsEffects from './posts.effects';
import { adapter, postsReducer } from './posts.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

export const PostsStore = signalStore(
  withReducers(postsReducer),
  withEffects(postsEffects),
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
  })),
  withHooks({
    onInit({ loadPosts }) {
      loadPosts();
    },
  })
);
