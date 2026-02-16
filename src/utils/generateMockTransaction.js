export function generateMockTransaction() {
  return {
    id: crypto.randomUUID(),
    userId: "U" + Math.floor(Math.random() * 1000),
    amount: Math.floor(Math.random() * 20000),
    isNewDevice: Math.random() > 0.7,
    failedAttempts: Math.floor(Math.random() * 5),
    geoMismatch: Math.random() > 0.8,
    time: new Date().toISOString()
  };
}
