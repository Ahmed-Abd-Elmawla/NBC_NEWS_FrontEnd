import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { SavesComponent } from './dashboard/saves/saves.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'admin-categories',
    component: CategoriesComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'post-details/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'category/:id',
    component: CategoryPostsComponent,
  },
  {
    path: 'admin-posts',
    component: PostsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'admin-users',
    component: UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'admin-contacts',
    component: ContactComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    component:RegisterComponent,
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'contact',
    component:ContactsComponent,
  },
  {
    path: 'saves',
    component:SavesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
