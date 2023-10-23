export const getDate = (date: string) => {


  if (!date) return "2023-11-23T09:34:32.774Z";//todo: check this
  const myDate = new Date(date);
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(myDate);
  };
  