import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { TopicService } from './topic.service';

fdescribe('TopicServiceService', () => {
  let service: TopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('topics', () => {
    it('can be added to localstorage', () => {
      const topic = service.addTopic({
        image: 'test',
        subTitle: 'test',
        title: 'title',
      });

      return firstValueFrom(topic)
        .then((t) => {
          expect(t.id).not.toBeUndefined();
        })
        .then(() => {
          const topics = service.getTopics();
          return firstValueFrom(topics);
        })
        .then((topics) => {
          expect(topics.length).toBe(1);
        });
    });

    it('can be removed from localstorage', () => {
      service.addTopic({
        image: 'test',
        subTitle: 'test',
        title: 'title1',
      });

      const topic = service.addTopic({
        image: 'test',
        subTitle: 'test',
        title: 'title2',
      });

      return firstValueFrom(topic)
        .then((t) => {
          service.removeTopic(t.id);
          return firstValueFrom(service.getTopics());
        })
        .then((topics) => {
          expect(topics.length).toBe(1);
        });
    });

    it('can be updated', () => {
      const topic = service.addTopic({
        image: 'test',
        subTitle: 'test',
        title: 'title',
      });

      return firstValueFrom(topic)
        .then((t) => {
          service.updateTopic(t.id, { subTitle: 'updated' });
          const topic = service.getTopicById(t.id);
          return firstValueFrom(topic);
        })
        .then((t) => {
          expect(t?.subTitle).toBe('updated');
        });
    });
  });
});
