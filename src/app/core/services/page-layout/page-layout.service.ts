import { Injectable } from '@angular/core';
import { PageLayout } from '../../enums/Page-layout';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLayoutService {
  private layoutSubject = new BehaviorSubject<PageLayout>(PageLayout.UnAuthorized);

  public layout$ = this.layoutSubject.asObservable();

  setLayout(value: PageLayout) {
      this.layoutSubject.next(value);
  }
}
