interface orderRating {
    rate: number, 
    count: number,
  }
  
  export interface OrderItemInt {
     id: number, 
     title: string, 
     price: number, 
     description: string, 
     category: string, 
     image: string, 
     rating: orderRating
  }
  
  