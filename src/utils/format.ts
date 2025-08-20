export const formatPrice = (price: number, currency: 'KES' | 'USD' = 'KES'): string => {
  const formatter = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(price);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-KE').format(num);
};

export const formatArea = (area: number): string => {
  return `${formatNumber(area)} m²`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};