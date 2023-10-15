export const getDate = (date: string) => {
    const myDate = new Date(date);
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(myDate);
  };
  