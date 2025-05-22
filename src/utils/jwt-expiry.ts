export function calculateExpiryDate(expiresIn: string): Date {
  const now = new Date();
  const matched = expiresIn.match(/^(\d+)([dhms])$/);

  if (!matched) {
    throw new Error(`Invalid expiresIn format: ${expiresIn}`);
  }

  const amount = parseInt(matched[1], 10);
  const unit = matched[2];

  switch (unit) {
    case 'd':
      now.setDate(now.getDate() + amount);
      break;
    case 'h':
      now.setHours(now.getHours() + amount);
      break;
    case 'm':
      now.setMinutes(now.getMinutes() + amount);
      break;
    case 's':
      now.setSeconds(now.getSeconds() + amount);
      break;
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }

  return now;
}

export function parseExpiresInToMs(expiresIn: string): number {
  const matched = expiresIn.match(/^(\d+)([dhms])$/);

  if (!matched) {
    throw new Error(`Invalid JWT_REFRESH_EXPIRES_IN format: ${expiresIn}`);
  }

  const amount = parseInt(matched[1], 10);
  const unit = matched[2];

  switch (unit) {
    case 'd':
      return amount * 24 * 60 * 60 * 1000;
    case 'h':
      return amount * 60 * 60 * 1000;
    case 'm':
      return amount * 60 * 1000;
    case 's':
      return amount * 1000;
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}
