import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Filters, Profile } from '../../core';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  username: any;
  profile: Profile;
  filters: Filters = new Filters();

  ngOnInit() {
    this.username = this.router.url.split("/")[2];
    this.filters.favorited = this.username;
    this.cd.markForCheck();
  }

}