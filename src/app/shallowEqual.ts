export const shallowEqual = (v: any, o: any) => {
  console.log('shallowEqual');
  for (const key in v) if (!(key in o) || v[key] !== o[key]) return false;

  for (const key in o) if (!(key in v) || v[key] !== o[key]) return false;

  console.log('shallowEqual is true');
  return true;
};

// module.exports = shallowEqual;
