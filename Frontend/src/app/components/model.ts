// export interface Login {
//     userId: string
//     password: string
// }

export interface BookDetail {
    genre: string
    title: string
    edition: string
    authors: string
    format: string
    description: string

    price: any
    pages: number
    rating: string

    book_id: number,
    pic: Blob 

    username: string
    bookTitle: string
   
    
}

export interface BookSummary {   
    title: string
    price: number
    book_id: number
    pic: Blob

}

export interface NewOrder {
    username?: string
    bookLineOrder: LineItem[]  
    grandTotal: any 
    
}

export interface LineItem {
	title: string
	book_id: number
    price: string
    quantity: number
}


export interface BookOrderHistory { 
    ord_id : string
    total : string
    ts: any
}

