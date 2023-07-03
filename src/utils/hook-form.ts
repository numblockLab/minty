import { isEmpty, isString } from "lodash";

export const setEmptyOrStr = (v: unknown) => {
  if (isString(v) && isEmpty(v)) return null;
  return v;
};
