import { User } from './types'
import { GridCellProps } from '@progress/kendo-react-grid'

type EditIdCallBack = (id: number | null) => void
type NewAddedCallBack = (NewAdded: boolean) => void
type TempDataCallback = (User: User[]) => void
type DataCallback = (User: User[]) => void
type DisplayErrorsCallBack = (errors: string[]) => void

export const command = () => {
  return (
    <td className='k-command-cell'>
      <div className='table--button--group'>
        <button className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-save-command'>
          Edit
        </button>
        <button className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'>
          Remove
        </button>
      </div>
    </td>
  )
}