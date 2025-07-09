import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Define the TMDb movie type
interface Movie {
  id: number;
  original_title: string;
  release_date?: string;
  vote_average?: number;
  [key: string]: any; 
}


interface TmdbResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

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
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  keyword: string = '';
  voteAverage: number = 0;
  year: number = 1900;
  suggestions: Movie[] = [];
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getHomePageContent();
    // Set up autocomplete with debounce
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after typing
      distinctUntilChanged(), // Only proceed if query changes
      switchMap(query => this.searchMoviesApi(query))
    ).subscribe(results => {
      this.suggestions = results;
    });
  }

  // Fetch initial movies for the homepage
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

  // Filter movies by vote average and year
  filterMovies(): void {
    const baseUrl = 'api/discover/movie';
    const params: string[] = [];

    if (this.voteAverage) {
      params.push(`vote_average.gte=${this.voteAverage}`);
    }
    if (this.year) {
      params.push(`primary_release_year=${this.year}`);
    }

    const url = params.length ? `${baseUrl}?${params.join('&')}` : baseUrl;
    console.log('Filter URL:', url);

    const headers = new HttpHeaders({
      'Authorization': environment.apiKey,
      'accept': 'application/json'
    });

    this.http.get<TmdbResponse>(url, { headers }).subscribe({
      next: (response) => {
        console.log('Filtered movies response:', response);
        this.movies = response.results || [];
      },
      error: (err) => console.error('Failed to fetch filtered movies:', err)
    });
  }

  // Handle input for autocomplete
  onInput(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim();
    if (query.length >= 2) { // Only search with 2+ characters
      this.searchSubject.next(query);
    } else {
      this.suggestions = []; // Clear suggestions if query is too short
    }
  }

  // Handle keydown for autocomplete (e.g., clear on Escape)
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.suggestions = []; // Clear suggestions
    }
  }

  // Fetch movie suggestions for autocomplete
  private searchMoviesApi(query: string) {
    const url = `api/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
    const headers = new HttpHeaders({
      'Authorization': environment.apiKey,
      'accept': 'application/json'
    });

    return this.http.get<TmdbResponse>(url, { headers }).pipe(
      map((response: TmdbResponse) => response.results || [])
    );
  }

  // Handle movie selection from autocomplete
  selectMovie(movie: Movie) {
    this.keyword = movie.original_title; // Update input with selected title
    this.suggestions = []; // Clear suggestions
    // Navigate to movie details page
    this.router.navigate(['/movie', movie.id]);
  }

  // Search movies by keyword
  searchMovies(): void {
    if (this.keyword.trim()) {
      this.searchMoviesApi(this.keyword).subscribe(results => {
        this.movies = results; // Update movie list with search results
        this.suggestions = []; // Clear suggestions
        // Optional: Navigate to the first result
        // if (results.length > 0) {
        //   this.router.navigate(['/movie', results[0].id]);
        // }
      });
    }
  }
}