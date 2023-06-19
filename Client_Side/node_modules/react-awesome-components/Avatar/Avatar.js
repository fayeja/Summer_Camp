import React from 'react';
import {PropTypes} from 'prop-types';
import 'antd/dist/antd.css';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export function getAvatar({size, shape}) {
  return (
    <>
      <>
        <Avatar shape={shape} size={size} icon={<UserOutlined />} />
      </>
    </>
    );
  };

getAvatar.propTypes = {
  /**
   * Define the size 
  */
  size: PropTypes.oneOf(['small', 'large']),
  /**
   * Define the shape 
   */
  shape: PropTypes.oneOf(['square', 'circle']),
};

getAvatar.defaultProps = {
  size: 'small',
  shape: 'circle',
};

export default getAvatar;