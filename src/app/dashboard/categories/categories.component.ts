import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CategoriesServiceService } from '../../services/categories-service.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  //global variables -----------------------------------------------------------------------------------
  flag = true;
  form!: FormGroup;
  categories!: any;
  category_name!: any;
  category_id!: number;

  constructor(
    private req: CategoriesServiceService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private fb: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.fetchData();
    //create validation for form-------------------------------------------------------------------------
    this.form = this.fb.group({
      category: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
    });
  }

  //get data from Api-------------------------------------------------------------------------------------
  fetchData() {
    this.req.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  //open create form--------------------------------------------------------------------------------------
  open(content: any) {
    this.category_name = null;
    this.modalService.open(content, { centered: true });
  }

  //open update form--------------------------------------------------------------------------------------
  openUpdate(content: any, name: string, id: number) {
    this.flag = false;
    this.category_name = name;
    this.category_id = id;
    this.modalService.open(content, { centered: true });
  }

  //create new category-----------------------------------------------------------------------------------
  create() {
    const data = new FormData();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if (files.length > 0) {
        data.append('cover', files[0], files[0].name);
      }
    }
    data.set('category_name', this.category_name);

    this.req.createCategory(data).subscribe(
      (res) => {
        {
          this.modalService.dismissAll();
          this.fetchData();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your category has been created.',
            showConfirmButton: false,
            timer: 3000,
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

  //update category---------------------------------------------------------------------------------------
  update() {
    const data = new FormData();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if (files.length > 0) {
        data.append('cover', files[0], files[0].name);
      }
    }
    data.set('_method', 'PUT');
    data.set('category_name', this.category_name);
    this.req.updateCategory(this.category_id, data).subscribe(
      (res) => {
        {
          this.modalService.dismissAll();
          this.fetchData();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your category has been updated.',
            showConfirmButton: false,
            timer: 3000,
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

  //delete category---------------------------------------------------------------------------------------
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
        this.req.deleteCategory(id).subscribe(
          (res) => {
            this.modalService.dismissAll();
            this.fetchData();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your category has been deleted.',
              showConfirmButton: false,
              timer: 3000,
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
}
