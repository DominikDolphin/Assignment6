import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MusicDataService} from '../music-data.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  results : any;
  seachQuery : any;
  q: any;
  private paramSub;
  private searchSub;
  constructor( private route : ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.paramSub = this.route.queryParams.subscribe(params => {
      this.q = params['q'];
      this.searchSub = this.musicData.searchArtists(this.q).subscribe(
        data => 
        this.results = data.artists.items.filter(e => e.images.length > 0) //Only display if it has minimum 1 image
      )
    });
  }

}
