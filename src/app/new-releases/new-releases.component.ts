import { Component, OnInit, OnDestroy } from '@angular/core';
import * as data from '../data/NewReleasesAlbums.json';
import {MusicDataService} from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases = null;
  //public releases = null;
  //constructor(public data : MusicDataService) { }
  constructor() { }
  ngOnInit(): void {
    this.releases = data.albums.items;
  // this.releases = this.data.getNewReleases().subscribe();
  }

  ngOnDestroy(){
    //this.releases.unsubscribe();
  }

}
