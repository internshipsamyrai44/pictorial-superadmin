'use client';

import s from './PaymentRow.module.scss';
import Image from 'next/image';
import emptyAvatar from '../../../../../../public/img/noAvatar.png';
import { Payment } from '@/entities/payments/types';

type Props = {
  payment: Payment;
};

export const PaymentRow = ({ payment }: Props) => {
  const paymentMethod =
    payment.paymentMethod === 'STRIPE' ? 'Stripe' : payment.paymentMethod === 'PAYPAL' ? 'PayPal' : 'Credit Card';
  const subscriptionType = payment.type === 'MONTHLY' ? '1 month' : payment.type === 'DAY' ? '1 day' : '1 week';
  const paymentCurrency = payment.currency === 'USD' ? '$' : '€';
  const paymentDate = new Date(payment.createdAt).toLocaleDateString();
  const userAvatar = payment.avatars[1]?.url || payment.avatars[0]?.url || emptyAvatar;

  return (
    <tr>
      <td className={s.userCell}>
        <Image src={userAvatar} alt="userAvatar" width={36} height={36} />
        <span>{payment.userName}</span>
      </td>
      <td>{paymentDate}</td>
      <td>
        {payment.amount}
        {paymentCurrency}
      </td>
      <td>{subscriptionType}</td>
      <td>{paymentMethod}</td>
    </tr>
  );
};
