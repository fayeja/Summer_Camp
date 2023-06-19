import React from 'react';
import {PropTypes} from 'prop-types';
import 'antd/dist/antd.css';
import {Alert} from 'antd';

export function getAlert({type}) {
  return (
    <>
      <Alert 
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type={type}
        showIcon />
    </>
  );
};

getAlert.propTypes = {
  /**
   * Define the type
   */
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
};

getAlert.defaultProps = {
  type: 'success',
};

export default getAlert;