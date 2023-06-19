import React from "react";
import {Button} from 'antd';
import {PropTypes} from 'prop-types';
import './Button.module.css';
import 'antd/dist/antd.css';

const getButton = ({size}) => (
  <>
    <Button size={size} className="bouton-default">
      Bouton
    </Button>
  </>);

getButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

getButton.defaultProps = {
  size: 'medium',
};

export default getButton;
