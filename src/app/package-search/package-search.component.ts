import { Component, OnInit } from "@angular/core";
import { PackageSearchService, NpmPackageInfo } from './package-search.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-package-search',
    templateUrl: './package-search.component.html',
    providers: [ PackageSearchService ]    
})
export class PackageSearchComponent implements OnInit {
    withRefresh = false;
    packages$: Observable<NpmPackageInfo[]>;
    /*
    A subject is a special type of Observable that allows values to be multicasted to many Observers.
    Every Subject is an Observer. It is an object with the methods next(v), error(e), and complete(). 
    */
    private searchText$ = new Subject<string>(); //the sequence of search-box values coming from the user

    search(packageName: string) {
        this.searchText$.next(packageName);    
    }

    ngOnInit() {
        this.packages$ = this.searchText$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            /*
              three important characteristics for switchMap
              1. It takes a function argument that returns an Observable. 
                 PackageSearchService.search returns an Observable, as other data service methods do.

              2. If a previous search request is still in-flight (as when the network connection is poor), 
                 it cancels that request and sends a new one.

              3. It returns service responses in their original request order, 
                 even if the server returns them out of order.      
            */
            switchMap(packageName => 
                this.searchService.search(packageName, this.withRefresh))
        );
    }    
    constructor(private searchService: PackageSearchService) {}

    toggleRefresh() { this.withRefresh = ! this.withRefresh; }

}