'use client';

export const PaymentsTableEmpty = () => {
  return (
    <tr>
      <td colSpan={5} style={{ textAlign: 'center' }}>
        Платежи не найдены
      </td>
    </tr>
  );
};
