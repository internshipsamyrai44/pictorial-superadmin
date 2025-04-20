'use client';

export const UserTableEmpty = () => {
  return (
    <tr>
      <td colSpan={5} style={{ textAlign: 'center' }}>
        Пользователи не найдены
      </td>
    </tr>
  );
};
