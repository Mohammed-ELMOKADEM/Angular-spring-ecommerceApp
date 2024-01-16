import { Component, OnInit } from '@angular/core';
import { Product, User } from '../types';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products !: Array<Product>;
  public ordersProducts : Product[] = [];

  constructor(private productService : ProductService,
    private router:Router,
    public appState : AppStateService,
    private orderService : CartService){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (products:any) =>{
        this.products=products;
      },
      error: err =>{
        console.log(err);
      }
    })
  }

  handleDelete(product:Product) {
    if(confirm("Do you really wanna delete this product?")){
      this.productService.deleteProduct(product).subscribe({
        next: data=>{
          alert("Product deleted with success!!");
          this.getProducts();
        },
        error: err =>{
          console.log(err);
        }
      })
    }
  }
  handleUpdate(product:Product) {
    this.router.navigateByUrl("/updateProduct/"+product.idProduct);
  }

  addToCart(product: Product) {
    let user !: User;
    if(this.appState.authState.isAuthenticated){
      user = this.appState.authState.user;
      this.orderService.addOrder(user.userId,product.idProduct).subscribe({
        next: data =>{
          this.orderService.getCart(this.appState.authState.user.userId).subscribe({
            next: orders =>{
             let size: number =orders.length
             this.appState.setAuthState({
              totalNumberOrders : size,
             })
             orders.forEach((order:any) => {
              let product :Product = order.product as Product;
              this.ordersProducts.push(product);
            });
            this.appState.setCartState({
              products : this.ordersProducts,
            })
            },
            error : err =>{
              console.log(err);
            }
          })
        },
        error: err=>{
          console.log(err);
        }
      })
    }
    else{
      console.log("not authenticated");
    }
  }
}
