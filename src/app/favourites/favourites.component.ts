import { Component, OnInit, OnDestroy } from '@angular/core';
import {MusicDataService} from '../music-data.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any>;
  private favSub;
  private removeSub;
  constructor(private musicData: MusicDataService) { }

  removeFromFavourties(id){
    this.removeSub = this.musicData.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks);
  }

  ngOnInit(): void {
    this.favSub = this.musicData.getFavourites().subscribe(data=> this.favourites = data.tracks);
  }
  
  ngOnDestroy(): void {
    this.favSub.unsubscribe();
    this.removeSub.unsubscribe();
  }
  
}
