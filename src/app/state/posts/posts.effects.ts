import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { createEffect } from 'ngrx-signals-redux';
import { catchError, filter, map, of, pipe, switchMap } from 'rxjs';
import { Post } from './post.model';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './posts.actions';
import { PostsStore } from './posts.store';

@Injectable()
export class PostsEffects {
  private readonly http = inject(HttpClient);
  private readonly postsStore = inject(PostsStore);

  loadPosts$ = createEffect(
    pipe(
      ofType(loadPosts),
      filter(() => this.postsStore.loading()),
      switchMap(() =>
        this.http
          .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
          .pipe(
            map((posts) => loadPostsSuccess({ posts })),
            catchError((error) => of(loadPostsFailure({ error })))
          )
      )
    )
  );
}
