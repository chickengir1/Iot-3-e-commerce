import React from 'react';
import { QuantitySelectorStyled } from './styles/ColorSelectorStyles';

const QuantitySelector = () => {
  const quantities = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <QuantitySelectorStyled>
      <label>수량</label>
      <select>
        {quantities.map((quantity) => (
          <option key={quantity} value={quantity}>{quantity}</option>
        ))}
      </select>
    </QuantitySelectorStyled>
  );
};

export default QuantitySelector;
