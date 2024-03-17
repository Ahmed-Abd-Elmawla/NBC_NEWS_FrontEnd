import { Component } from '@angular/core';
import { PostsServiceService } from '../../services/posts-service.service';
import { CategoriesServiceService } from '../../services/categories-service.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  //global variables ---------------------------------------------------------------------------------
  post_id!: number;
  article_1_id!: number;
  article_2_id!: number;
  title!: any;
  sub_title!: any;
  paragraph_1!: any;
  paragraph_2!: any;
  paragraph_3!: any;
  source_1!: any;
  source_2!: any;
  details_1!: any;
  details_2!: any;
  location!: any;
  category!: any;
  tags: string = '';
  allPosts!: any;
  flag = true;
  form!: FormGroup;
  categories!: any;
  category_id!: any;
  userId!: any;

  constructor(
    private post: PostsServiceService,
    private req: CategoriesServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private cookieService: CookieService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('user') || '[]');
    this.userId = this.cookieService.get('userId');
    this.post.getPostsByUserId(this.userId).subscribe((res: any) => {
      this.allPosts = res;
      console.log(this.allPosts);
    });

    this.req.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
    //create validation for form--------------------------------------------------------
    // const coverValidator =
    // this.flag == true ? [Validators.required, this.coverValidatorFn] : [];
    this.form = this.fb.group({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
      ]),
      sub_title: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
      ]),
      paragraph_1: new FormControl(null, [
        Validators.required,
        Validators.minLength(50),
      ]),
      paragraph_2: new FormControl(null, [
        Validators.required,
        Validators.minLength(50),
      ]),
      paragraph_3: new FormControl(null, [
        Validators.required,
        Validators.minLength(50),
      ]),
      location: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\S+$/),
      ]),
      cover: new FormControl(null, this.getValidatorsForCover()),
      image_1: new FormControl(null, this.getValidatorsForCover()),
      image_2: new FormControl(null, this.getValidatorsForCover()),
      source_1: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      source_2: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      details_1: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
      ]),
      details_2: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
      ]),
      tags: new FormControl(null),
    });
    //make all input fields touched to show errors after the form load
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  // Helper method to get validators for cover
  private getValidatorsForCover() {
    return this.flag == true
      ? [Validators.required, this.coverValidatorFn]
      : null;
  }

  //open create post form-----------------------------------------------------------------------------
  open(content: any) {
    this.title = null;
    this.paragraph_1 = null;
    this.location = null;
    this.category_id = 'category name';
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  //open Update post form-----------------------------------------------------------------------------
  openUpdate(
    content: any,
    id: any,
    title: any,
    sub_title: any,
    para_1: any,
    para_2: any,
    para_3: any,
    location: any,
    category: any,
    details_1: any,
    details_2: any,
    source_1: any,
    source_2: any
  ) {
    this.flag = false;
    this.post_id = id;
    this.title = title;
    this.sub_title = sub_title;
    this.paragraph_1 = para_1;
    this.paragraph_2 = para_2;
    this.paragraph_3 = para_3;
    this.location = location;
    this.category_id = category;
    this.details_1 = details_1;
    this.details_2 = details_2;
    this.source_1 = source_1;
    this.source_2 = source_2;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  //create new post-----------------------------------------------------------------------------------
  create() {
    const formData = new FormData();
    const cover = document.querySelector('input[id="cover"]');
    if (cover instanceof HTMLInputElement && cover.files) {
      const files = cover.files;
      formData.append('cover', files[0], files[0].name);
    }

    const image_1 = document.querySelector('input[id="image_1"]');
    if (image_1 instanceof HTMLInputElement && image_1.files) {
      const files = image_1.files;
      formData.append('image_1', files[0], files[0].name);
    }

    const image_2 = document.querySelector('input[id="image_2"]');
    if (image_2 instanceof HTMLInputElement && image_2.files) {
      const files = image_2.files;
      formData.append('image_2', files[0], files[0].name);
    }

    // formData.set('user_id', String(this.user?.id));
    formData.set('user_id', this.userId);
    formData.set('title', this.title);
    formData.set('sub_title', this.sub_title);
    formData.set('paragraph_1', this.paragraph_1);
    formData.set('paragraph_2', this.paragraph_2);
    formData.set('paragraph_3', this.paragraph_3);
    formData.set('location', this.location);
    formData.set('category_id', this.category_id);
    formData.set('image_source_1', this.source_1);
    formData.set('image_source_2', this.source_2);
    formData.set('details_1', this.details_1);
    formData.set('details_2', this.details_2);
    formData.set('tags', this.tags);
    console.log(this.tags);
    this.post.createPost(formData).subscribe(
      (res) => {
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your post has been created.',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            setTimeout(() => {
              // window.location.reload();
            }, 0);
          });
        }
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          }),
            console.error(err);
      }
    );
  }

  //update post---------------------------------------------------------------------------------------
  update() {
    const formData = new FormData();
    formData.set('_method', 'PUT');
    formData.set('user_id', this.userId);
    formData.set('title', this.title);
    formData.set('sub_title', this.sub_title);
    formData.set('paragraph_1', this.paragraph_1);
    formData.set('paragraph_2', this.paragraph_2);
    formData.set('paragraph_3', this.paragraph_3);
    formData.set('location', this.location);
    formData.set('category_id', this.category_id);
    formData.set('image_source_1', this.source_1);
    formData.set('image_source_2', this.source_2);
    formData.set('details_1', this.details_1);
    formData.set('details_2', this.details_2);

    this.post
      .updatePost(this.post_id, this.article_1_id, this.article_2_id, formData)
      .subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your post has been updated.',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        },
        (err) => {
          if (err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.message,
            }),
              console.error(err);
        }
      );
  }

  //delete post---------------------------------------------------------------------------------------
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0d6efd',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.post.deletePost(id).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your post has been deleted.',
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 0);
            });
          },
          (err) => {
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.message,
              }),
                console.error(err);
          }
        );
      }
    });
  }

  //custom validator for cover
  coverValidatorFn(control: AbstractControl): ValidationErrors | null {
    const input = document.querySelector('input[id="cover"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if (files.length < 1) {
        return { fileCount: true };
      }
    }
    return null;
  }
}
