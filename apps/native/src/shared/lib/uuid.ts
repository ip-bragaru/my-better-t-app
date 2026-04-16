function randomHex(byteCount: number) {
  return Array.from({ length: byteCount }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  ).join("");
}

export function createUuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  const part1 = randomHex(4);
  const part2 = randomHex(2);
  const part3 = `4${randomHex(2).slice(1)}`;
  const variant = ((Math.floor(Math.random() * 256) & 0x3f) | 0x80)
    .toString(16)
    .padStart(2, "0");
  const part4 = `${variant}${randomHex(1)}`;
  const part5 = randomHex(6);

  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}
