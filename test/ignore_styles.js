function disableOnTest() {
  return null;
}
require.extensions['.css'] = disableOnTest;
require.extensions['.scss'] = disableOnTest;
require.extensions['.svg'] = disableOnTest;
