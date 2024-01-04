import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

export const loadPosts = createAction('[Posts] Load Posts');

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: Error }>()
);

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
