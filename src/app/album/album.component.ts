import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ActivatedRoute } from '@angular/router';
import {MusicDataService} from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album = null;
  private id;
  private idSub;
  private albumSub;


  addToFavourites(trackID){
    if (this.musicData.addToFavourites(trackID) == true){
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    } else {
      this.snackBar.open("Unable to add song to Favorites", "Error", { duration: 1500 });
    }
    /*
    this.musicData.addToFavourites(trackID).subscribe(params=>{
      console.log(params)
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }, error => {
      console.log(error);
      this.snackBar.open("Unable to add song to Favorites", "Error", { duration: 1500 });
    })*/
  }
  constructor(@Inject(MatSnackBar) public snackBar: any, private route : ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.albumSub = this.musicData.getAlbumById(this.id).subscribe(data => this.album = data);
    });
  }

  ngOnDestroy(){
    this.idSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

}
