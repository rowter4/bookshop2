import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class CartService {
    
    public cartItemList: any = []
    public onUpdatedItemsList = new BehaviorSubject<any>([])

    public qty !: number

    constructor(private fb: FormBuilder) {}

    getAllItems() {
        return this.onUpdatedItemsList.asObservable()
    }

    setAllItems(item: any) {
        this.cartItemList.push(item)
        this.onUpdatedItemsList.next(item)
    }

    addToCart(item: any) {
        // console.info(">>>> add to cart service fired")
        this.cartItemList.push(item)
        this.onUpdatedItemsList.next(this.cartItemList)
        console.info(">>>> all items inside cart fired: ", this.cartItemList)
        this.qty = this.cartItemList.length
        this.getTotalPrice()
    }

    getTotalPrice() : number {
        let grandTotal = 0
        this.cartItemList.map ( (a:any) => {
            grandTotal += a.price
        })

        return grandTotal
    }

    removeCartItem(item: any) {
        this.cartItemList.map( (a:any , index: any) => {
            if (item.id === a.id) {
                this.cartItemList.splice(index, 1)
            }
        })
        this.onUpdatedItemsList.next(this.cartItemList)
    }

    removeAllCart() {
        this.cartItemList = []
        this.onUpdatedItemsList.next(this.cartItemList)
    }
}