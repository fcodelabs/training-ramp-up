import { useState } from 'react'
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import { User } from '../../utils/types'

type DataCallback = (User: User[]) => void

export const DropDown = (props: {
  gender: string
  data: User[]
  setData: DataCallback
  editId: number | null
}) => {
  const [genderState, setGenderState] = useState(props.gender)

  const handleChange = (event: DropDownListChangeEvent) => {
    setGenderState(event.target.value)
    const newData = props.data.map((item) => {
      return item.id === props.editId ? { ...item, gender: event.value } : item
    })
    props.setData(newData)
  }

  return <DropDownList data={['male', 'female']} value={genderState} onChange={handleChange} />
}
