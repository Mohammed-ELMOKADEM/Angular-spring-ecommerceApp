import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Product } from '../types';
import { Observable } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http : HttpClient, private appState : AppStateService) { }
  headers !: HttpHeaders;
  public getProducts(){ 
    this.headers = this.appState.authState["headers"];
    return this.http.get("http://localhost:8080/api/products",{headers:this.headers});
  }

  public getProductById(idProduct:number) : Observable<Product>{
    this.headers = this.appState.authState["headers"];
    return this.http.get<Product>("http://localhost:8080/api/products/"+idProduct,{headers:this.headers});
  }

  public addProduct(product : Product) : Observable<Product>{
    this.headers = this.appState.authState["headers"];
    return this.http.post<Product>("http://localhost:8080/api/newProduct",product,{headers:this.headers});
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.headers = this.appState.authState["headers"];
    return this.http.put<Product>("http://localhost:8080/api/updateProduct/"+product.idProduct,product,{headers:this.headers});
  }

  public deleteProduct(product : Product){
    this.headers = this.appState.authState["headers"];
    return this.http.delete<any>("http://localhost:8080/api/deleteProduct/"+product.idProduct,{headers:this.headers});
  }
}
