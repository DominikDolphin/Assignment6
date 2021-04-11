import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
   favouritesList : Array<any> = [];
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?limit=50&include_groups=album,single`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  
  addToFavourites(id){
    if (!id || id >= 50) 
      return false
    else {
      this.favouritesList.push(id)
      return true
    }
  }

  removeFromFavourites(id) : Observable<any>{
    this.favouritesList.splice(this.favouritesList.indexOf(id),1);
    return this.getFavourites();
  }

  getFavourites() : Observable<any>{
    if (this.favouritesList.length > 0){
      let FavouritesListItems = this.favouritesList.join(); //adds comma seperated between elements
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${FavouritesListItems}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    } else return new Observable(o=>{o.next([])});
  }
  
  /*
  addToFavourites(id): Observable<[String]> {
    //console.log(this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, {}));
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, {});
  }
  
  removeFromFavourites(id): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      favouritesArray.splice(favouritesArray.indexOf(id),1);
      return this.getFavourites();
    }));
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if (favouritesArray.length > 0){
        let FavouritesListItems = favouritesArray.join(); //adds comma seperated between elements
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${FavouritesListItems}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      } else return new Observable(o=>o.next({tracks: []}));
    }));
  }
  */
  
}