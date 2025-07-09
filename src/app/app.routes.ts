import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CastDetailsComponent } from './cast-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'person/:id', component: CastDetailsComponent },
];
