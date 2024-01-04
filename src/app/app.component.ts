import { Component, OnInit, inject } from '@angular/core';
import { EffectsDirective, provideStore } from 'ngrx-signals-redux';
import { PostsStore, postsProvider } from './state/posts';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [postsProvider],
  hostDirectives: [EffectsDirective],
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
export class AppComponent implements OnInit {
  readonly postsStore = inject(PostsStore);

  ngOnInit() {
    this.postsStore.loadPosts();
  }
}
