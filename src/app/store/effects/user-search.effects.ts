import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import * as UserActions from "../actions/user-search.actions";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserSearchEffects {
  private userService = inject(UserService);
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  private baseUrl: string = environment.githubApi;

  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>{
        const headers = new HttpHeaders({
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer `,
          'X-GitHub-Api-Version': '2022-11-28'
        });


        return this.http.get<any>(`${this.baseUrl}/${action.login}`, {
          headers,
        }).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        );
        })

    )
  );
}
