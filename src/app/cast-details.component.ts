import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-cast-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {
  castId!: number;
  castData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.castId = +params['id'];
      this.fetchCastDetails();
    });
  }

  fetchCastDetails() {
    const headers = new HttpHeaders({
      'Authorization': environment.apiKey,
      'Accept': 'application/json'
    });

    this.http.get(`api/person/${this.castId}?language=en-US`, { headers })
      .subscribe(data => {
        this.castData = data;
        console.log(this.castData)
      });
  }
}
