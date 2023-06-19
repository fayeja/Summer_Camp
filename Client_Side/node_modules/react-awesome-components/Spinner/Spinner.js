import React from 'react';
import {Spin,Space} from 'antd';
import {PropTypes} from 'prop-types';
import 'antd/dist/antd.css';
import './Spinner.module.css';

const Spinner = ({size}) => (
  <>
    <Space size="middle"> 
      <Spin size={size} /> 
    </Space>
  </>
);

Spinner.propTypes = {
  /**
   * Define the size 
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Spinner.defaultProps = {
  size: 'small',
};

export default Spinner;