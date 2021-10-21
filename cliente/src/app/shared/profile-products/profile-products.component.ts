import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Filters, Profile } from '../../core';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.scss']
})
export class ProfileProductsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  username: any;
  profile: Profile;
  filters: Filters = new Filters();

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.filters.author = this.username;
  }
}
