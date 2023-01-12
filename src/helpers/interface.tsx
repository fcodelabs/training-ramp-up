export interface Person {
  PersonID: number
  PersonName?: string
  PersonGender?: string
  PersonAddress?: string
  PersonMobileNo?: string
  DateOfBirth?: Date
  PersonAge?: Number
  inEdit: boolean 
  locked?: boolean
  expanded?: boolean
  Discontinued?: boolean
}

export interface ProductCategory {
  CategoryID?: number
  CategoryName?: string
  Description?: string
  details?: any
}

export interface Product {
  ProductID: number
  ProductName?: string
  SupplierID?: number
  CategoryID?: number
  QuantityPerUnit?: string
  UnitPrice?: number
  UnitsInStock?: number
  UnitsOnOrder?: number
  ReorderLevel?: number
  Discontinued?: boolean
  Category?: ProductCategory
  expanded?: boolean
  inEdit?: boolean | string
  locked?: boolean
}

export interface columnInterface {
  title?: string
  field?: string
  show?: boolean
  filter?: 'boolean' | 'numeric' | 'text' | 'date' | undefined
  minWidth?: number
  minGridWidth?: number
  locked?: boolean
  width?: string | number
}

export interface OrderShipAddress {
  street: string
  city: string
  region: string
  postalCode: number
  country: string
}

export interface OrderDetails {
  productID: number
  unitPrice: number
  quantity: number
  discount: number
}
export interface Order {
  orderID: number
  OrderID?: number
  customerID: string
  employeeID: number
  orderDate?: Date
  requiredDate: Date
  shippedDate?: Date
  shipVia: number
  freight: number
  shipName: string
  shipAddress: OrderShipAddress
  details: OrderDetails[]
}
