import bcrypt from "bcryptjs";

export const hashContent = async (s: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedValue = await bcrypt.hash(s, salt);
  return hashedValue;
};

export const compareHash = async (
  s: string,
  hash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(s, hash);
  return isMatch;
};
