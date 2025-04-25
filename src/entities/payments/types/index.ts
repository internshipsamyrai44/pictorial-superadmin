export type PaymentsResponse = {
  getPayments: {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Payment[];
  };
};

export type Payment = {
  id: number;
  userId: number;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: PaymentСurrency;
  createdAt: string;
  endDate: string;
  type: SubscriptionType;
  userName: string;
  avatars: Avatar[];
};
export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
};

enum PaymentMethod {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  CREDIT_CARD = 'CREDIT_CARD'
}

enum PaymentСurrency {
  USD = 'USD',
  EUR = 'EUR'
}

enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  DAY = 'DAY',
  WEEKLY = 'WEEKLY'
}
