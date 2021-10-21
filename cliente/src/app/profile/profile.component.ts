import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Profile, ProfilesService, User, UserService } from '../core';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private profileService: ProfilesService,

    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}
  faUserEdit = faUserEdit;
  profile: Profile;
  currentUser: User;
  isUser: boolean;

  username: string;
  ngOnInit() {
    
    this.clickChangeProfile();
    console.log(this.ActivatedRoute.data);
    this.ActivatedRoute.data
      .pipe(
        concatMap((data: any) => {
          console.log(data);
          this.profile = data.profile;
          console.log(this.profile);
          // Load the current user's data.
          return this.userService.currentUser.pipe(
            tap((userData: User) => {
              this.currentUser = userData;
              this.isUser = this.currentUser.username === this.profile.username;
            })
          );
        })
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }

  onToggleFollowing(isFollow: boolean) {
    this.profile.isFollow = isFollow;
  }

  clickChangeProfile() {
    this.ActivatedRoute.params.subscribe((profile) => {
      this.profileService.get( profile.username).subscribe(
        (data) => {
          this.profile = data;
          this.isUser = this.currentUser.username === this.profile.username;

          this.cd.markForCheck();

        },
        (error) => {
          console.log(error);
        }
      );
    });

    // this.http.getSingleProduct(this.productId).subscribe((data: { result: any }) => {
    //   this.product = data.result;
    // })

    //   this.userService.getCurrentUser()
    //   this.cd.markForCheck();

    //   this.ngOnInit();
  }
}
