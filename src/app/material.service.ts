import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { IMaterial } from './IMaterial';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private localStorage: LocalStorageService) {}

  private readonly key: string = 'materials';

  getMaterialById(id: string): Observable<IMaterial | undefined> {
    const material = this.localStorage
      .getItemWithDefault<IMaterial[]>(this.key, [])
      .find((material) => material.id === id);

    return of(material);
  }

  getMaterialsByTopicId(id: string): Observable<IMaterial[]> {
    const materials = this.localStorage
      .getItemWithDefault<IMaterial[]>(this.key, [])
      .filter((material) => material.topicId === id);

    return of(materials);
  }

  addMaterial(newMaterial: Omit<IMaterial, 'id'>): Observable<IMaterial> {
    const material: IMaterial = { ...newMaterial, id: uuid() };
    this.localStorage.push(this.key, material);
    return of(material);
  }

  removeMaterial(id: string): void {
    this.localStorage.removeAll<IMaterial>(this.key, (mat) => mat.id === id);
  }

  updateMaterial(
    id: string,
    update: Partial<IMaterial>
  ): Observable<IMaterial> {
    const materials = this.localStorage.getItemWithDefault<IMaterial[]>(
      this.key,
      []
    );
    const index = materials.findIndex((material) => material.id === id);

    if (index === -1) {
      throw new Error(`Material with (id=${id}) is not exists in localstorage`);
    }

    materials[index] = {
      ...materials[index],
      ...update,
    };

    this.localStorage.setItem(this.key, materials);
    return of(materials[index]);
  }
}
