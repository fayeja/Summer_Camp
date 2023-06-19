import * as React from 'react';
import PropTypes from 'prop-types';
import {Badge,Avatar} from 'antd';

const getBadge = ({size,status}) => (
  <>
    <Badge size={size} status={status} count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);


getBadge.propTypes = {
  /**
   * Define size of numeral
   */
  size: PropTypes.oneOf(['small', 'default']),
  /**
   * Define the status
  */
  status: PropTypes.oneOf(['success', 'warning', 'error', 'processing']),
};

getBadge.defaultProps = {
  size: 'default',
  status: 'error'
};

export default getBadge;