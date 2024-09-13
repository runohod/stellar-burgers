import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchLoginUser } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // Для хранения текстов ошибок

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Отправка логина и ожидание результата
    try {
      const resultAction = await dispatch(fetchLoginUser({ email, password }));
      
      // Проверяем, успешен ли вход
      if (fetchLoginUser.fulfilled.match(resultAction)) {
        navigate('/'); // Перенаправление на главную страницу
      } else {
        // Если вход не удался, установим ошибку
        setErrorText('Ошибка входа. Проверьте ваши учетные данные.');
      }
    } catch (error) {
      setErrorText('Произошла ошибка. Попробуйте снова позже.');
    }
  };

  return (
    <LoginUI
      errorText={errorText} // Передаем текст ошибки в компонент
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
