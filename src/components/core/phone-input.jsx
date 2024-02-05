import Input from 'react-phone-number-input/input'

export function PhoneInput({ value, onChange }) {
  return <Input
        international
        withCountryCallingCode
        value={value}
        onChange={onChange}
    />;
}