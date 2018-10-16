import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FoodApp from './FoodApp';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<FoodApp />, document.getElementById('root'));
registerServiceWorker();
