/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  public set(key: string, value: any, expire = false, time = 0): void {
    const item = {
      value: value,
      expire: expire ? new Date().getTime() + time : null,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  public get(key: string): any {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    if (item.expire && new Date().getTime() > item.expire) {
      this.deleteItem(key);
      return null;
    }

    return item.value;
  }

  public deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
