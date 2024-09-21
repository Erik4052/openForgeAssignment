import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //NOTE: This is a new way to inject the services we need in the service class
  users:WritableSignal<User[]> = signal<User[]>([]);
  user:WritableSignal<User | null> = signal<User | null>(null);
}
