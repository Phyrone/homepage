const pages_imports = import.meta.glob('/blog/*.svx', {
  eager: false,
  exhaustive: false,
  import: 'default',
});
export const pages = Object.entries(pages_imports).map(async ([path, page]) => {
  const module = await page();
  return {
    path,
    module,
  };
});
