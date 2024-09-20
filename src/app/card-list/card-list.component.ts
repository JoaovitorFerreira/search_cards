import { Component, OnInit, Query, SimpleChanges } from '@angular/core';
import { CardService } from '../card.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards: any[] = [];
  searchControl = new FormControl('');
  cards$!: Observable<string[]>;
  filteredCards: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cardService.getCards().subscribe((cards) => {
      this.cards = cards;
      this.filterCards('');
    });

    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(100), distinctUntilChanged())
      .subscribe((searchTerm) => this.filterCards(searchTerm));
  }

  filterCards(searchTerm: string | null) {
    const filteredFiles = this.cards.filter((card: any) =>
      card.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    this.cards$ = of(filteredFiles);
    this.cards$.subscribe(
      (filteredData) => (this.filteredCards = filteredData)
    );
  }

  deleteCard(cardToDelete: string) {
    this.cards = this.cards.filter((card) => card !== cardToDelete);
    this.filterCards(this.searchControl.value || '');
  }

  toggleView(card: any, event: Event) {
    event.preventDefault();
    card.isExpanded = !card.isExpanded;
  }
}
