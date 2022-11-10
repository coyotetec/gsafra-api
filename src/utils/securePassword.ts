import bcrypt from 'bcrypt';

export async function securePassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function comparePassword(password: string, passwordHash: string) {
  if (await bcrypt.compare(password, passwordHash)) {
    return true;
  }

  return false;
}
