function sum(a, b) {
  return a + b;
}


test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1 + 3 to equal 3", () => {
  expect(sum(1, 3)).toBe(4);
});

test('the data is peanut butter', async () => {
  const response = await fetch("http://localhost:8080/health")
  let {health} = await response.json()
  expect(health).toBe(true);
});