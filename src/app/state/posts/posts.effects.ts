import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { createEffect } from 'ngrx-signals-redux';
import { catchError, map, of, switchMap } from 'rxjs';
import { Post } from './post.model';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './posts.actions';

export const loadPosts$ = createEffect((actions, http = inject(HttpClient)) =>
  actions.pipe(
    ofType(loadPosts),
    switchMap(() =>
      http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
        map((posts) => loadPostsSuccess({ posts })),
        catchError((error) => of(loadPostsFailure({ error })))
      )
    )
  )
);
