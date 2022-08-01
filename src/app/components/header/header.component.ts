import { AuthService } from './../../services/auth/auth.service';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoggedInUser } from '../auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string = 'Title';

  public userName$: Observable<string|null> = this.store.select(getLoggedInUser);

  constructor(
    private auth: AuthService,
    private store: Store
  ) {}

  loggout() {
    this.auth.loggout();
  }
}
