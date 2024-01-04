import { Component, inject } from '@angular/core';
import { provideStore } from 'ngrx-signals-redux';
import { PostsStore } from './state';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideStore(PostsStore)],
  imports: [],
  template: `
    <h1>Posts</h1>
    <ul>
      @for (post of postsStore.posts(); track post.id) {
      <li>{{ post.title }}</li>
      }
    </ul>
  `,
})
export class AppComponent {
  readonly postsStore = inject(PostsStore);
}
