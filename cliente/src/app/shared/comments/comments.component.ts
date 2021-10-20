import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment, User, UserService } from '../../core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})


export class CommentsComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  canModify: boolean;
  subscription: Subscription;
  faTrash=faTrash;
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = userData.username === this.comment.author.username;
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
