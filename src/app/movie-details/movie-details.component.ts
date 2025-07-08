import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Person {
  name: string;
  character?: string;
  job?: string;
  profile_path: string | null;
}
interface Genre {
  id: BigInteger;
  name: string;
}
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movieData: any;
  cast: Person[] = [];
  crew: Person[] = [];
  genreList: Genre[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.fetchMovieDetails();
      this.fetchMovieCredits();
    });
  }

  fetchMovieDetails() {
  const headers = new HttpHeaders({
    'Authorization': environment.apiKey,
    'Accept': 'application/json'
  });

  this.http.get(`api/movie/${this.movieId}?language=en-US`, { headers })
    .subscribe(data => {
      this.movieData = data;
    });
}

fetchMovieCredits() {
  const headers = new HttpHeaders({
    'Authorization': environment.apiKey,
    'Accept': 'application/json'
  });

  this.http.get(`api/movie/${this.movieId}/credits?language=en-US`, { headers })
    .subscribe((data: any) => {
      this.cast = (data.cast || []).slice(0, 5);

    });
}

}
