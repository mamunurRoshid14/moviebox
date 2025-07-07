import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = '/api/movie/changes?page=1';

    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTYyNjViMTA3NzFkNzI3Nzk4NDQzZWE2NWExNzZmNyIsIm5iZiI6MTc1MTg4NjY3Ny4zNTgsInN1YiI6IjY4NmJhYjU1YzhlYzE3NDVhM2NlZTc4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W9FAPBH8zc7TMJ-WMvq1TYsESJs_l9OoQCz0Ptpj8AY',
      'accept': 'application/json'
    });

    this.http.get(url, { headers }).subscribe({
      next: (response) => console.log('TMDb API response:', response),
      error: (error) => console.error('Error fetching TMDb data:', error)
    });
  }

  logMessages(): void {
    console.log('🔵 This is a log message.');
    console.info('🟢 This is an info message.');
    console.warn('🟠 This is a warning message.');
    console.error('🔴 This is an error message.');
    console.debug('⚪ This is a debug message.');
    console.trace('🧭 This is a trace message.');
  }
  title="Myapp"
}

