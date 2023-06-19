import React from 'react';
import {PropTypes} from 'prop-types';
import 'antd/dist/antd.css';
import './Switch.module.css';
import {Switch} from 'antd';

export function getSwitch({size}) {
  return (
    <>
      <Switch size={size} defaultChecked />
    </>
  );
};

getSwitch.propTypes = {
  /**
   * Define the size 
   */
   size: PropTypes.oneOf(['small', 'large']),
};

getSwitch.defaultProps = {
  size: 'small',
};

export default getSwitch;