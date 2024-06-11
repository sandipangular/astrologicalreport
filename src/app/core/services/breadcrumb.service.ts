import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs$ = this._breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, '', breadcrumbs);
      this._breadcrumbs.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, url: string, breadcrumbs: Breadcrumb[]) {
    if (route) {
      const newUrl = url + '/' + route.url.map(segment => segment.path).join('/');
      if (route.data['breadcrumb']) {
        breadcrumbs.push({
          label: route.data['breadcrumb'],
          url: newUrl
        });
      }
      this.addBreadcrumb(route.children[0], newUrl, breadcrumbs);
    }
  }
}
