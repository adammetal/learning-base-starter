import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { ITopic } from './ITopic';

@Injectable({
  providedIn: 'root',
})
export class TopicServiceService {
  constructor() {}

  getTopics(): Observable<ITopic[]> {
    const raw = localStorage.getItem('topics') ?? '[]';
    const topics = <ITopic[]>JSON.parse(raw);
    return of(topics);
  }

  getTopicById(id: string): Observable<ITopic | undefined> {
    const raw = localStorage.getItem('topics') ?? '[]';
    const topics = <ITopic[]>JSON.parse(raw);
    const topic = topics.find((topic) => topic.id === id);
    return of(topic);
  }

  addTopic(topic: Omit<ITopic, 'id'>): Observable<ITopic> {
    const raw = localStorage.getItem('topics') ?? '[]';
    const topics = <ITopic[]>JSON.parse(raw);
    const saved = { ...topic, id: uuid() };
    topics.push(saved);

    localStorage.setItem('topics', JSON.stringify(topics));

    return of(saved);
  }

  removeTopic(id: string): void {
    const raw = localStorage.getItem('topics') ?? '[]';
    const topics = <ITopic[]>JSON.parse(raw);

    const index = topics.findIndex((topic) => topic.id === id);
    if (index !== -1) {
      topics.splice(index, 1);
    }

    localStorage.setItem('topics', JSON.stringify(topics));
  }

  updateTopic(id: string, updated: Partial<ITopic>) {
    const raw = localStorage.getItem('topics') ?? '[]';
    let topics = <ITopic[]>JSON.parse(raw);

    topics = topics.map((topic) => {
      if (topic.id !== id) {
        return topic;
      }

      return {
        ...topic,
        ...updated,
      };
    });

    localStorage.setItem('topics', JSON.stringify(topics));
  }
}
