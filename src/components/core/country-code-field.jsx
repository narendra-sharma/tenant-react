import React, { useState } from 'react';
import Input from 'react-phone-number-input/input';

const CountryCodeField = () => {
  const [countryCode, setcountryCode] = useState('');
  const onChangeInput = (e, label) => {
    setcountryCode(e.target.value);
  };
  return (
    <Input
      withCountryCallingCode={false}
      international={true}
      placeholder="Phone no."
      className="form-control"
      value={countryCode}
      aria-label="Amount (to the nearest dollar)"
      maxLength={14}
      onInput={(e) => {
        if (e.target.value.length > e.target.maxLength || !e.target.value.match('^[0-9]')) {
          e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
      }}
      onChange={(e) => onChangeInput(e, 'phone')}
    />
  );
};

export default CountryCodeField;
