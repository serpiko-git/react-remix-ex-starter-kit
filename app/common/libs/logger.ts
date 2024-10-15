const isProd =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';

if (isProd) {
  console.log = () => {};
  console.group = () => {};
  console.error = () => {};
}
