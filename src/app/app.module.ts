import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BreakingComponent } from './breaking/breaking.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { EditorPicksComponent } from './editor-picks/editor-picks.component';
import { RelatedTopicsComponent } from './related-topics/related-topics.component';
import { SavesComponent } from './dashboard/saves/saves.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    SideBarComponent,
    CategoriesComponent,
    UserProfileComponent,
    HomeComponent,
    HeaderComponent,
    BreakingComponent,
    PostDetailsComponent,
    PostsComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ContactsComponent,
    ContactComponent,
    CategoryPostsComponent,
    EditorPicksComponent,
    RelatedTopicsComponent,
    SavesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
