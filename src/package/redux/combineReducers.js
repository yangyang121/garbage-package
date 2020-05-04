export default function combineReducers(reducers) {
  const keys = Object.keys(reducers);
  return (state, action) => {
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key];
      result[key] = reducer(state, action);
    }
    return result;
  };
}
