import React, { Component, PropTypes} from 'react';
import DevTools from './DevTools';

const App = ({children}) => {
  return (
    <div>
      {children}
      <DevTools />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
