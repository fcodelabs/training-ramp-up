import { GridCellProps } from '@progress/kendo-react-grid'

export default interface Person {
  personID: number
  personName: string
  gender: string
  address: string
  mobileNo: string
  dob: Date
  inEdit?: boolean
}

export interface CellProps {
  gridCellProps: GridCellProps
  edit?: (p: Person) => void
  remove?: (p: Person) => void
  add?: (p: Person) => void
  discard?: (p: Person) => void
  update?: (p: Person) => void
  cancel?: (p: Person) => void
}
