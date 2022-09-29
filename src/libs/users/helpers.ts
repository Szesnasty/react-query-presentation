export const getUserId = (pathname: string): string => {
  return pathname.split("/")[pathname.split("/").length - 1];
};
