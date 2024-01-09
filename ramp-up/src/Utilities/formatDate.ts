
const formatDate = (value: string | null): string => {
    const dateObject = value ? new Date(value) : null;
  
    return dateObject
      ? `${dateObject.toLocaleDateString('en-US', { weekday: 'short' })}
         ${dateObject.toLocaleDateString('en-US', { month: 'short' })} 
         ${dateObject.toLocaleDateString('en-US', { day: 'numeric' })} 
         ${dateObject.toLocaleDateString('en-US', { year: 'numeric' })}`
      : '';
  };

export default formatDate;