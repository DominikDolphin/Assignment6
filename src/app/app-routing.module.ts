import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {NewReleasesComponent} from './new-releases/new-releases.component';
import {ArtistDiscographyComponent} from './artist-discography/artist-discography.component';
import {AlbumComponent} from './album/album.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [

  { path: 'newReleases', component: NewReleasesComponent },
  { path: 'search', component : SearchResultComponent},
  { path: 'favourites', component : FavouritesComponent},
  { path: 'artist/:id', component: ArtistDiscographyComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component : RegisterComponent},
  { path: 'login', component : LoginComponent},
  { path: '', redirectTo: '/newReleases', pathMatch: 'full' }, ///originally linked to /album, but that does not exist anymore
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
