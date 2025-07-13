import { useState } from 'react';
import { Button } from '../../../components';
import { ComponentsCustomStyles, ButtonCustomProps } from '../../../types';

type BuyFormProps = {
  formData: {
    username: string;
    starsCount: number;
  };
  setFormData: (data: { username: string; starsCount: number }) => void;
  onContinue: () => void;
  classes?: ComponentsCustomStyles;
};

const BuyForm = ({ 
  formData, 
  setFormData, 
  onContinue,
  classes 
}: BuyFormProps) => {
  const [errors, setErrors] = useState({ username: '', starsCount: '' });

  const Button_custom = (props: ButtonCustomProps) => (
    <Button {...props} classes={classes} />
  );

  const validateForm = (): boolean => {
    const newErrors = { username: '', starsCount: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
      isValid = false;
    }

    if (formData.starsCount < 50) {
      newErrors.starsCount = 'Минимальное количество звезд: 50';
      isValid = false;
    } else if (formData.starsCount > 10000) {
      newErrors.starsCount = 'Максимальное количество звезд: 10000';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onContinue();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">
          Имя пользователя в Telegram
        </label>
        <input
          type="text"
          className="w-full bg-dark-700 rounded px-3 py-2 text-white"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="@username"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>

      <div className="mb-8">
        <label className="block text-white font-medium mb-2">
          Количество звезд (от 50 до 10000)
        </label>
        <input
          type="number"
          className="w-full bg-dark-700 rounded px-3 py-2 text-white"
          value={formData.starsCount}
          onChange={(e) => setFormData({ ...formData, starsCount: parseInt(e.target.value) || parseInt('') })}
          min={50}
          max={10000}
        />
        {errors.starsCount && (
          <p className="text-red-500 text-xs mt-1">{errors.starsCount}</p>
        )}
      </div>

      <div className="flex justify-end mt-auto">
        <Button_custom onClick={handleSubmit}>
          Продолжить
        </Button_custom>
      </div>
    </div>
  );
};

export default BuyForm; 