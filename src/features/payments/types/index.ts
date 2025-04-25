type StatusSubscriptionType = 'PENDING' | 'ACTIVE' | 'FINISHED' | 'DELETED';
type SubscriptionType = 'MONTHLY' | 'DAY' | 'WEEKLY';
type PaymentMethod = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';

export type PaymentType = {
  id: string;
  paymentMethod?: PaymentMethod;
  price: number;
  endDate: string;
  startDate: string;
  paymentType: PaymentMethod;
  type: SubscriptionType;
};
export type SubscriptionByPaymentModel = {
  id: string;
  businessAccountId: number;
  status: StatusSubscriptionType;
  dateOfPayment: string;
  startDate: string;
  endDate: string;
  type: SubscriptionType;
  price: number;
  paymentType: PaymentMethod;
  payments: PaymentType[];
};

export type PaymentResponse = {
  getPaymentsByUser: {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: SubscriptionByPaymentModel[];
  };
};
