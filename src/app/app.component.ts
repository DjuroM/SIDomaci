import { Component, OnInit } from '@angular/core';
import { ApiService } from './servisi/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private apiServis: ApiService) { }

  ngOnInit(): void {
    this.apiServis.setProducts();
  }

}
