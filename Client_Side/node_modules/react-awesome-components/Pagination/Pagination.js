import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';

const getPagination = ({size}) => <Pagination total={100} size={size} />;

getPagination.propTypes = {
  /**
   * Define the size
   */
  size: PropTypes.oneOf(['small', 'default']),
};

getPagination.defaultProps = {
  size: 'default',
};

export default getPagination;