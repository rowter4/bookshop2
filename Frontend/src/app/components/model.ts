export interface Login {
    userId: string
    password: string
}

export interface BookDetail {
    genre: string
    title: string
    edition: string
    authors: string
    format: string
    description: string

    price: number
    pages: number
    rating: number

    book_id: number,
    pic: Blob 
    
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

