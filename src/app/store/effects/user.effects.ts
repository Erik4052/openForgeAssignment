import { Injectable, inject } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import * as UserActions from "../actions/user.actions";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  private baseUrl: string = environment.githubApi;

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(({since, perPage}) => {
        const headers = new HttpHeaders({
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer `,
          'X-GitHub-Api-Version': '2022-11-28'
        });

        return this.http.get<any>(this.baseUrl, {
          headers,
           params:{
            since: since.toString(),
            per_page: perPage.toString()
          }
        }).pipe(
          map(users => UserActions.loadUsersSuccess({users})),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        );
      })
    )
  );
}
