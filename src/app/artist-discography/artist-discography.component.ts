import { Component, OnInit } from '@angular/core';
import * as albumData from '../data/SearchResultsAlbums.json';
import * as artistData from '../data/SearchResultsArtist.json';
import { ActivatedRoute } from '@angular/router';
import {MusicDataService} from '../music-data.service';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  albums = null;
  artist = null;
  private id : any;
  private idSub;
  private artistSub: any;
  private albumSub: any;
  //newArtist = null;
  //constructor() { }
  
  constructor(private route : ActivatedRoute, private data: MusicDataService) {}
  ngOnInit(): void {
    this.idSub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.albumSub = this.data.getAlbumsByArtistId(this.id).subscribe(data => this.albums = data.items);
      this.artistSub = this.data.getArtistById(this.id).subscribe(data => this.artist = data);
   });


   
    //this.artist = (artistData as any).default;
    //this.albums = albumData.albums.items;
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.artistSub.unsubscribe();
    this.albumSub.unsubscribe();
    
    
  }
}
