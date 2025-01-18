interface Currency {
  amount: number;
  currency: 'INR' | 'USD' | 'EUR';
}

export function formatCurrency({ amount, currency }: Currency) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
