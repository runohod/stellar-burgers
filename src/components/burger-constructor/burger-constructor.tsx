import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burger-constructor-slice';
import {
  fetchOrderBurger,
  orderActions,
  orderSelectors
} from '../../services/slices/order-slice';
import { useNavigate } from 'react-router-dom';
import { fetchUser, userSelectors } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const user = useSelector(userSelectors.userSelector);
  const constructorItems = useSelector(
    burgerConstructorSelectors.ingredientsSelector
  );
  const orderRequest = useSelector(orderSelectors.orderRequestSelector);
  const orderModalData = useSelector(orderSelectors.orderSelector);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');
    else dispatch(fetchUser());

    const bunId = constructorItems.bun._id;
    const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
    const orderData = [bunId, ...ingredientsIds, bunId];

    dispatch(fetchOrderBurger(orderData));
  };

  const closeOrderModal = () => {
    dispatch(orderActions.clearOrderModalDataAction());
    dispatch(burgerConstructorActions.clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
