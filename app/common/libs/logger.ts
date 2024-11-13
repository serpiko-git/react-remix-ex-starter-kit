const isProd =
  (process.env.NODE_ENV as string) === 'production' ||
  (process.env.NODE_ENV as string) === 'prod';

if (isProd) {
  console.log = () => {};
  console.group = () => {};
  console.error = () => {};
}
