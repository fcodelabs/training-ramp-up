import { GridRowsProp } from '@mui/x-data-grid'

export const calculateAge = (dateOfBirth: Date) => {
    if (!dateOfBirth) {
        return null
    }

    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--
    }

    return age
}

export const formatDate = (value: string | null): string => {
    const dateObject = value ? new Date(value) : new Date()

    return dateObject
        ? `${dateObject.toLocaleDateString('en-US', { weekday: 'short' })}
         ${dateObject.toLocaleDateString('en-US', { month: 'short' })} 
         ${dateObject.toLocaleDateString('en-US', { day: 'numeric' })} 
         ${dateObject.toLocaleDateString('en-US', { year: 'numeric' })}`
        : ''
}

export const formatMobileDisplay = (mobile: string) => {
    const numericMobile = mobile.replace(/\D/g, '')
    if (numericMobile.startsWith('94')) {
        const formattedMobile = '0' + numericMobile.slice(2)

        return formattedMobile.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    } else {
        return numericMobile
            .replace(/^\+/, '')
            .replace(/(\d{3})(\d{3})(\d{3,})/, '$1-$2-$3')
    }
}


export const generateNewId = (data: GridRowsProp) => {
    const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0)
    return maxId + 1
}

