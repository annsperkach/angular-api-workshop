import { Component, OnInit } from '@angular/core';
import { StarwarsService, character } from './starwars.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'api';

  constructor(private readonly starWarsService: StarwarsService) {}

  characters: any | null = null;
  characters$: Observable<character[]> =
    this.starWarsService.getAllCharacters3();

  ngOnInit() {
    this.characters = this.starWarsService.getAllCharacters();
  }
}