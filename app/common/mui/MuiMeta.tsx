import theme from './theme';

export function MuiMeta() {
  return (
    <>
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta name="emotion-insertion-point" content="emotion-insertion-point" />
    </>
  );
}
