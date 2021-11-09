import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ProductService,
  Product,
  NotificationService,
  User,
  Comment as Comments,
  CommentsService,
  UserService,
  GraphqlService
} from '../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product: Product ;
  images: String[] = [];
  public classList: String = '';
  slug: string | null;

  currentUser: User;
  canModify: boolean;
  comments: Comments[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private _productoService: ProductService,
    private commentsService: CommentsService,
    private userService: UserService,
    private graphqlService: GraphqlService,
    private notifyService: NotificationService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.slug = this.aRouter.snapshot.paramMap.get('slug'); //obtiene la 'slug' del link
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
   /*  console.log(this.slug); */
    if (typeof this.slug === 'string') {
      this._productoService.getProduct(this.slug).subscribe(
        (data) => {

          console.log(data)
          this.product = data;
          this.images = data.images;
          /* console.log(this.images); */
          // Load the comments on this article
          this.populateComments();
          this.getMyUser();
          this.cd.markForCheck();
        },
        (error) => {
          this.notifyService.showWarning(
            'Este producto no existe',
            'Bualabob informa'
          );
          console.log(error);
          this.router.navigate(['/']);
        }
      );
    }
  }

  getMyUser() {
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      // /* console.log(userData); */
      // console.log(this.product.author)
      // console.log(this.currentUser.username)

      this.canModify = String(this.currentUser.username) === String(this.product.author?.username);
      this.cd.markForCheck();
    });
  }

  populateComments() {
    if (this.product.slug) {
      this.commentsService.getAll(this.product.slug).subscribe((comments) => {
        this.comments = comments;
        console.log(this.comments);
        this.cd.markForCheck();
      });
    }
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    if (this.product.slug) {
      const commentBody = this.commentControl.value;
      this.commentsService.add(this.product.slug, commentBody).subscribe(
        (comment) => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
          this.notifyService.showSuccess('Tu comentario se ha publicado con éxito');

          this.cd.markForCheck();
        },
        (errors) => {
          this.notifyService.showWarning(
            'Hay algún tipo de problema con el comentario',
            'Bualabob ERROR'
          );
          this.isSubmitting = false;
          this.commentFormErrors = errors;
          this.cd.markForCheck();
        }
      );
    }
  }

  onDeleteComment(comment:Comments) {
      if (this.product.slug) {

      this.commentsService.destroy(comment.id, this.product.slug)
        .subscribe(
          success => {
            this.comments = this.comments.filter((item) => item !== comment);
            this.cd.markForCheck();
          }
        );
    }
  }

  onDeleteProduct() {
    if (this.product.slug) {
      this.graphqlService.deleteProduct(this.product.slug).subscribe(
        (data) => {
          console.log(data);
          this.notifyService.showInfo('Este producto ha sido eliminado con éxito', '¡Producto eliminado!');
          this.router.navigateByUrl('/shop');
        },
        (error) => {
          console.log(error);
          this.notifyService.showWarning('Ha habido algún problema y no se ha elimindado el producto', 'Error al eliminar');
        });
    }
  }

  onToggleFavorite(favorited: boolean) {
    this.product.favorited = favorited;
    console.log(this.product.favorited);
    if (favorited) {
      console.log("favorited:" + favorited);
      if (typeof this.product.favorites === 'number') {
        this.product.favorites++;
      }
    } else {
      if (typeof this.product.favorites === 'number') {
        this.product.favorites--;
      }
    }
  }

}
