import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITopic } from './ITopic';

@Injectable({
  providedIn: 'root',
})
export class TopicServiceService {
  constructor() {}

  getTopics(): Observable<ITopic[]> {
    return of([]);
  }

  getTopicById(id: string): Observable<ITopic> {
    return null;
  }

  addTopic(t: ITopic): Observable<ITopic> {}

  removeTopic(id: string): void {}

  updateTopic(id: string, topic: Partial<ITopic>) {}
}
