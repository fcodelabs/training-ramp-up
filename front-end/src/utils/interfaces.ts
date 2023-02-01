export interface Student {
  [x: string]: any
  id: number
  name: string
  gender: string
  address: string
  mobile: string
  dob: Date
  age: number
  inEdit?: boolean | string
}

export interface MyCommandCellProps {
  dataItem: any
  editField: string
  add: (dataItem: Student) => void
  update: (dataItem: Student) => void
  remove: (dataItem: Student) => void
  discard: (dataItem: Student) => void
  cancel: (dataItem: Student) => void
  edit: (dataItem: Student) => void
}
