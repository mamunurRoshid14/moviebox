import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies: any[] = [];
  keyword: string = '';
  voteAverage: number = 0;
  year: number = 1900;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getHomePageContent();
  }

  getHomePageContent(): void {
    const url = '/api/discover/movie';

    const headers = new HttpHeaders({
      'Authorization': environment.apiKey,
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

  searchMovies(): void {
    const baseUrl = `/api/discover/movie`;

    const params: string[] = [];

    if (this.voteAverage) {
      params.push(`vote_average.gte=${this.voteAverage}`);
    }

    if (this.keyword) {
      params.push(`with_keywords=${this.keyword}`);
    }

    if (this.year) {
      params.push(`year=${this.year}`);
    }
    const url = `${baseUrl}?${params.join('||')}`;
    console.log(url)


    const headers = new HttpHeaders({
      Authorization: `${environment.apiKey}`,
      accept: 'application/json'
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        console.log('Filtered movies response:', response);
        this.movies = response.results || [];
      },
      error: (err) => console.error('Failed to fetch filtered movies:', err)
    });
  }
}