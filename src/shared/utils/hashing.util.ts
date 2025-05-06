import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

export class HashingUtils {
  private static readonly _hashingSaltRounds: number = 10;

  public static comparePlainPassword(password: string, recordPassword: string) {
    return password === recordPassword;
  }

  public static hash(value: string): Promise<string> {
    return bcrypt.hash(value, HashingUtils._hashingSaltRounds);
  }

  public static compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  public static async generatePasswordResetToken() {
    const token = randomBytes(32).toString('hex');
    return await bcrypt.hash(token, HashingUtils._hashingSaltRounds);
  }
}
