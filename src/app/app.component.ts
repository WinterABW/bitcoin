import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  coins: Coin[] = [];
  filterCoins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Current Price', 'Price Change', '24h Volume'];
  searchText: string = '';
  constructor(private _http: HttpClient) {}

  searchCoin() {
    this.filterCoins = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ngOnInit(): void {
    this._http
      .get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
      )
      .subscribe(
        (res) => {
          (this.coins = res), (this.filterCoins = res);
        },
        (e) => console.log(e)
      );
  }
}
