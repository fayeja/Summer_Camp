import React from 'react';
import {PropTypes} from 'prop-types';
import 'antd/dist/antd.css';
import {Progress} from 'antd';

export function Progressbar({status, type}) {
  return (
    <>
      <Progress percent={50} size="small" status={status} type={type}/>
    </>
  );
};

Progressbar.propTypes = {
  /**
   * Define the the status
   */
  status: PropTypes.oneOf(['success', 'exception', 'normal', 'active']),
  /**
   * Define the type
   */
  type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
};

Progressbar.defaultProps = {
  status: 'success',
  type: 'line',
};

export default Progressbar;