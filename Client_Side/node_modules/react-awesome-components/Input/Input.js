import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const getInput = ({size}) => (
  <>
  <Input size={size} placeholder="size" prefix={<UserOutlined />} />
  </>
);

getInput.propTypes = {
  /**
   * Define the size 
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

getInput.defaultProps = {
  size: 'large',
};

export default getInput;