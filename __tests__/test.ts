function add(a, b) {
  return a + b;
}

test('Addition', () => {
  expect(add(1, 1)).toBe(2);
});
