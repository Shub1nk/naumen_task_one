import { applyMiddleware } from 'redux';

const logger = store => next => action => {
  console.log(`Action type - ${action.type}`);
  console.log('Payload -', action.payload);
  next(action);
}

export default applyMiddleware(logger);