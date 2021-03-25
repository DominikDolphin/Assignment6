import { Component, OnInit, OnDestroy } from '@angular/core';
import {MusicDataService} from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases = null;
  private subReleases;
  constructor(public musicService : MusicDataService) { }
  ngOnInit(): void {
    this.subReleases = this.musicService.getNewReleases().subscribe(data => this.releases = data.albums.items)
  }

  ngOnDestroy(){
    this.subReleases.unsubscribe();
  }
}
