import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Profile, ProfilesService, UserService } from '../../core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }
          // console.log(this.profile)
          // Follow this profile if we aren't already
          if (!this.profile.isFollow) {
            console.log(this.profile, 'false');

            console.log(this.profile.username);
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.profile.isFollow = this.profile.isFollow ? false : true;
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );

            // Otherwise, unfollow this profile
          } else {
            console.log(this.profile, 'true');

            return this.profilesService.unfollow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.profile.isFollow = this.profile.isFollow ? false : true;

                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }
}
