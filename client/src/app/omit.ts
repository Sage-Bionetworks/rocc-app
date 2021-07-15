// Source: https://levelup.gitconnected.com/omit-is-being-removed-in-lodash-5-c1db1de61eaf
// This article also provides an implementation that supports the specification
// of non-flattened property paths.

// Omits the properties specified from an object.
export const omit = (originalObject: any = {}, keysToOmit: string[] = []) => {
  const clonedObject = { ...originalObject };

  for (const path of keysToOmit) {
    delete clonedObject[path];
  }

  return clonedObject;
};
