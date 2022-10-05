import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    try {
      return <T>JSON.parse(raw);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  getItemWithDefault<T>(key: string, def: T): T {
    return this.getItem(key) ?? def;
  }

  setItem<T>(key: string, value: T): void {
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
    } catch (err) {
      console.log(err);
    }
  }

  push<T>(key: string, value: T): void {
    const items: T[] = this.getArray<T>(key);

    items.push(value);
    this.setItem(key, items);
  }

  removeAll<T>(key: string, pred: (item: T) => boolean): void {
    const items: T[] = this.getArray<T>(key);
    const after = items.filter((item) => !pred(item));
    this.setItem(key, after);
  }

  private getArray<T>(key: string): T[] {
    const items: T[] = this.getItemWithDefault<T[]>(key, []);

    if (!Array.isArray(items)) {
      throw new Error(`${items} is not an array`);
    }

    return items;
  }
}
