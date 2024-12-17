import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Dropdown } from '@openedx/paragon';
import './LanguageSelector.scss';
import { getConfig } from '@edx/frontend-platform';
import { getCookie, setCookie } from './cookies';
const LanguageSelector = ({ size }) => {
  const options = [
    { label: 'English', value: 'en' },
    { label: 'Tiếng Việt', value: 'vi' },
  ];
  const getLMSDomain = () => `.${getConfig().LMS_BASE_URL.replace('https://', '')}`;
  const handleSelect = (value) => {
    setCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME, value, 30, getLMSDomain());
    window.location.reload();
  };
  const languageCode = () => getCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME) || 'en';
  return (
    <DropdownButton
      className={size}
      id="home-change-language-button"
      title={options.filter(_ => _.value === languageCode())[0].label}
    >
      {options.map(({ value, label }) => (
        <Dropdown.Item
          key={value}
          onClick={() => { handleSelect(value); }}
        >{label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
LanguageSelector.propTypes = {
  size: PropTypes.string,
};
LanguageSelector.defaultProps = {
  size: '',
};
export default LanguageSelector;