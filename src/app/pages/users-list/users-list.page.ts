import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonList, IonAvatar, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/Services/user.service';
import { Observable } from 'rxjs';
import { loadUsers } from 'src/app/store/actions/user.actions';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@capacitor/inappbrowser';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard,
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
    CommonModule,
    FormsModule,
    RouterModule,
    IonButton,
    HttpClientModule,
  ],
})
export class UsersListPage implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  userService = inject(UserService);
  users$!: Observable<User[]>;
  since = 0;
  perPage = 25;
  //users: WritableSignal<User[]> = signal<User[]>([]);

  ngOnInit() {
    this._getUsers();
  }

  private _getUsers() {
    this.store.dispatch(
      loadUsers({ since: this.since, perPage: this.perPage })
    );
    this.store.select('users').subscribe((users) => {
      const currentUsers = this.userService.users();
      //NOTE: Since the key is not unique, we need to compare the id of the users
      const newUsers = users.filter(
        (newUser: User) =>
          !currentUsers.some((existingUser) => existingUser.id === newUser.id)
      );
      this.userService.users.set([...currentUsers, ...newUsers]);
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
}
