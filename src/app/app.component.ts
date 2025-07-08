import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'C:/Users/mamun/Documents/myapp/src/environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  getMovies(): void{
    const url = '/movies/changes?page=1';

    const headers = new HttpHeaders({
      'Authorization': environment.apiKey,
      'accept': 'application/json'
    });

    this.http.get(url, { headers }).subscribe({
      next: (response) => console.log('TMDb API response:', response),
      error: (error) => console.error('Error fetching TMDb data:', error)
    });
  }

  getCollectionById(): void{
    const url = '/collections/10?language=en-US';

    const headers = new HttpHeaders({
      'Authorization': environment.apiKey,
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


/*



*/
