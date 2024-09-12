import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.userSelector);

  return <AppHeaderUI userName={user ? user.name : 'Личный кабинет'} />;
};
