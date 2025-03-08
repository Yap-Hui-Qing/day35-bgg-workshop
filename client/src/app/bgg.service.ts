import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { first, firstValueFrom, Observable } from "rxjs";
import { SearchCriteria, SearchGame, SearchResult, Comment } from "./models";

@Injectable()
export class BggService {
    
    private http = inject(HttpClient)

    private searchResults: any[] = []

    searchAsObservable(criteria: SearchCriteria): Observable<SearchResult[]> {

        const params = new HttpParams()
            .set("q", criteria.q)
            .set("count", criteria.count)

        return this.http.get<SearchResult[]>('/api/search', {params})
    }

    search(criteria: SearchCriteria): Promise<SearchResult[]> {

        return firstValueFrom(this.searchAsObservable(criteria))
    }

    searchById(gid: number): Promise<SearchGame>{
        return firstValueFrom(this.http.get<SearchGame>(`api/search/${gid}`))
    }

    setResults(results: any[]){
        this.searchResults = results
    }

    getResults(){
        return this.searchResults
    }

    getCommentsByGameId(gid: number): Observable<Comment[]>{
        return this.http.get<Comment[]>(`api/search/${gid}/comments`)
    }
}