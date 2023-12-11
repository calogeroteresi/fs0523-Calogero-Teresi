import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from './iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl:string = 'https://dummyjson.com/docs/products';

  subject:Subject<string> = new Subject();
  lastProduct$ = this.subject.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<IProduct[]>('https://dummyjson.com/products');
  }
}
