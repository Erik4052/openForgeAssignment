import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/Services/user.service';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { clearUsers, loadUsers } from 'src/app/store/actions/user.actions';
import { InAppBrowser } from '@capacitor/inappbrowser';
import { Capacitor } from '@capacitor/core';
import {
  IonSearchbar,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonAvatar,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonLabel,
    IonItem,
    IonAvatar,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonButton,
    ReactiveFormsModule,
  ],
})
export class UsersListPage implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  userService = inject(UserService);
  users$!: Observable<User[]>;
  since = 0;
  perPage = 25;
  usersList$!: Observable<User[]>;
  filteredUsers: User[] = [];
  searchControl = new FormControl('');

  ngOnInit() {
    this._getUsers();
    this._prePopulateSearchBar();
    this._setupSearchSubscription();
  }

  private _getUsers() {
    this.store.dispatch(
      loadUsers({ since: this.since, perPage: this.perPage })
    );
    this.store.select('users').subscribe((users) => {
      //NOTE: Since the key is not unique, we need to compare the id of the users
      this._removeDuplicatedUsers(users);
    });
  }

  loadMore(event: any) {
    this.since += this.perPage;
    // Dispatch the action to load more users
    this.store.dispatch(
      loadUsers({ since: this.since, perPage: this.perPage })
    );
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async openUser(user: User) {
    if (Capacitor.getPlatform() === 'web') {
      this.userService.user.set(user);
      this.router.navigate(['/user', user.login]);
    } else {
      await InAppBrowser.openInExternalBrowser({
        url: user.html_url,
      });
    }
  }

  private _prePopulateSearchBar() {
    if (this.userService.user() !== null) {
      this.searchControl.setValue(this.userService.user()?.name ?? '');
      //this._filterUsers();
    }
  }

  private _setupSearchSubscription() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.searchControl.value === '') {
          this._clearUsersState();
          this._getUsers();
          return;
        } else {
          this._filterUsers();
        }
      });
  }

  private _filterUsers() {
    const searchTerm = this.searchControl?.value?.toLowerCase();
    this.store.select('users').subscribe((users) => {
      this.filteredUsers = users.filter((user: any) =>
        user.login.toLowerCase().includes(searchTerm)
      );
      this.userService.users.set(this.filteredUsers);
      this._removeDuplicatedUsers(this.filteredUsers);
    });
  }

  private _removeDuplicatedUsers(users: User[]) {
    const currentUsers = this.userService.users();
    const newUsers = users.filter(
      (newUser: User) =>
        !currentUsers.some((existingUser) => existingUser.id === newUser.id)
    );
    this.userService.users.set([...currentUsers, ...newUsers]);
  }

  private _clearUsersState() {
    this.store.dispatch(clearUsers());
  }
}
