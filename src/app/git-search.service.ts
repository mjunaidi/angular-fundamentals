import { Injectable } from '@angular/core';
import { GitSearch } from './git-search'
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];
  constructor(http: HttpClient) {
    //this.http = http
  }
  gitSearch = (query: string): Promise<GitSearch> => {
    let promise = new Promise((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query])
      } else {
        //resolve("Placeholder");
        this.http.get('https://api.github.com/search/repositories?q=' + query).toPromise().then((response)=>{
          resolve(response)
        }, (error) => {
          reject(error);
        })
      }
    })
    return promise;
  }
}
