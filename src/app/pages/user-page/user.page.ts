import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadUser } from 'src/app/store/actions/user-search.actions';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { UserService } from 'src/app/Services/user.service';
import { Store } from '@ngrx/store';
import { RepositoryHighlight } from 'src/app/directives/repos.directive';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
  standalone: true,
  imports: [CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonAvatar,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RepositoryHighlight
  ]
})
export class UserPage implements OnInit {
  userService = inject(UserService);
  private store = inject(Store);

  constructor() { }

  ngOnInit() {
    this._getUserSelected();
  }

  private _getUserSelected(){
    this.store.dispatch(
      loadUser({login: this.userService.user()?.login ?? ''})
    );

    this.store.select('userSearch').subscribe(response => {
      this.userService.user.set(response.user);
      console.log(this.userService.user());

    });
  }

}


