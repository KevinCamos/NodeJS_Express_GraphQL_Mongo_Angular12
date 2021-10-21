import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Filters, Profile } from '../../core';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
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
  }

}