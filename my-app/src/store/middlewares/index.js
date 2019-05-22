import { applyMiddleware } from 'redux';

const logger = store => next => action => {
  console.log(`Action type - ${action.type}\n\rPayload - ${action.payload}`);
  next(action);
}

export default applyMiddleware(logger);