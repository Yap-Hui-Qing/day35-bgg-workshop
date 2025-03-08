import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import { DetailsComponent } from './components/details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { BggService } from './bgg.service';
import { CommentsComponent } from './components/comments.component';

const appRoutes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'game/:gid', component: DetailsComponent},
  {path: 'comments/:gid', component: CommentsComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent, SearchComponent, DetailsComponent, CommentsComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ provideHttpClient(), BggService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
