import bcrypt from "bcryptjs";

export const hashContent = async (s: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedValue = await bcrypt.hash(s, salt);
  return hashedValue;
};
