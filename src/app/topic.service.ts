import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { IMaterial } from './IMaterial';
import { ITopic } from './ITopic';
import { LocalStorageService } from './local-storage.service';
import { MaterialService } from './material.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  constructor(
    private localStorage: LocalStorageService,
    private materialService: MaterialService
  ) {}

  private readonly key: string = 'topics';

  getTopics(): Observable<ITopic[]> {
    return of(this.localStorage.getItemWithDefault<ITopic[]>(this.key, []));
  }

  getTopicById(id: string): Observable<ITopic | undefined> {
    const topic = this.localStorage
      .getItemWithDefault<ITopic[]>(this.key, [])
      .find((topic) => topic.id === id);
    return of(topic);
  }

  getMaterialsForTopic(id: string): Observable<IMaterial[]> {
    return this.materialService.getMaterialsByTopicId(id);
  }

  addTopic(newTopic: Omit<ITopic, 'id'>): Observable<ITopic> {
    const topic = { ...newTopic, id: uuid() };
    this.localStorage.push(this.key, topic);
    return of(topic);
  }

  removeTopic(id: string): void {
    this.localStorage.removeAll<ITopic>(this.key, (topic) => topic.id === id);
  }

  updateTopic(id: string, update: Partial<ITopic>): Observable<ITopic> {
    const topics = this.localStorage.getItemWithDefault<ITopic[]>(this.key, []);
    const index = topics.findIndex((topic) => topic.id === id);

    if (index === -1) {
      throw new Error(`Topic with (id=${id}) is not exists in localstorage`);
    }

    topics[index] = {
      ...topics[index],
      ...update,
    };

    this.localStorage.setItem(this.key, topics);
    return of(topics[index]);
  }
}
