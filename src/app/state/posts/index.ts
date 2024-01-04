import { provideStore } from 'ngrx-signals-redux';
import { PostsStore } from './posts.store';
import { PostsEffects } from './posts.effects';
export { PostsStore } from './posts.store';

export const postsProvider = provideStore(PostsStore, PostsEffects);
