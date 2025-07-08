import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule,CommonModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies: any[] = [];
  searchTerm: string = '';
  minVoteAverage: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getHomePageContent();
  }

  getHomePageContent(): void {
    const url = '/home';

    const headers = new HttpHeaders({
      'Authorization': `${environment.apiKey}`,
      'accept': 'application/json'
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        console.log('TMDb API response:', response);
        // Assuming response has a 'results' array of movies
        this.movies = response.results || [];
      },
      error: (error) => console.error('Error fetching TMDb data:', error)
    });
  }

  filteredMovies() {
    return this.movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesVote = movie.vote_average >= this.minVoteAverage;
      return matchesTitle && matchesVote;
    });
  }
}
