export const textLimit = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text;
  }