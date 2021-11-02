import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug:string, payload:any): Observable<Comment> {
    return this.apiService
    .post(
      `products/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(map(data => data.comment));
  }

  getAll(slug:string): Observable<Comment[]> {
    return this.apiService.get(`products/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId:string, articleSlug:string) {
    return this.apiService
      .delete(`products/${articleSlug}/comments/${commentId}`);
  }

}
