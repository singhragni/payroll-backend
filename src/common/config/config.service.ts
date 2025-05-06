import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigWrapperService {
  constructor(private configService: ConfigService) {}

  // handle error if not there .
  private getRequired<T>(key: string): T {
    const value = this.configService.get<T>(key);
    if (value === undefined || value === null) {
      throw new Error(`Missing required configuration key: ${key}`);
    }
    return value;
  }

  get databaseHost(): string {
    return this.getRequired<string>("DATABASE_HOST");
  }

  get databasePort(): number {
    return this.getRequired<number>("DATABASE_PORT");
  }

  get databaseUsername(): string {
    return this.getRequired<string>("DATABASE_USER");
  }

  get databasePassword(): string {
    return this.getRequired<string>("DATABASE_PASSWORD");
  }

  get databaseName(): string {
    return this.getRequired<string>("DATABASE_NAME");
  }

  get environment(): string {
    return this.getRequired<string>("NODE_ENV");
  }

  get accessTokenSecret(): string {
    return this.getRequired<string>("ACCESS_TOKEN_SECRET");
  }

  get accessTokenExpiresAt(): string {
    return this.getRequired<string>("ACCESS_TOKEN_EXPIRES_AT");
  }

  get refreshTokenSecret(): string {
    return this.getRequired<string>("REFRESH_TOKEN_SECRET");
  }

  get refreshTokenExpiresAt(): string {
    return this.getRequired<string>("REFRESH_TOKEN_EXPIRES_AT");
  }

  get googleClientId(): string {
    return this.getRequired<string>("GOOGLE_CLIENT_ID");
  }

  get googleClientSecret(): string {
    return this.getRequired<string>("GOOGLE_CLIENT_SECRET");
  }

  get mfaTokenSecret(): string {
    return this.getRequired<string>("MFA_SECRET_KEY");
  }

  get mfaTokenExpiresAt(): string {
    return this.getRequired<string>("MFA_TOKEN_EXPIRES_AT");
  }

  get maximumOtpRequest(): number {
    return this.getRequired<number>("MAXIMUM_OTP_REQUEST");
  }

  get emailHost(): string {
    return this.getRequired<string>("EMAIL_HOST");
  }

  get emailUsername(): string {
    return this.getRequired<string>("EMAIL_USER");
  }

  get emailPassword(): string {
    return this.getRequired<string>("EMAIL_PASSWORD");
  }

  get emailFrom(): string {
    return this.getRequired<string>("EMAIL_FROM");
  }

  get smtpPort(): number {
    return this.getRequired<number>("SMTP_PORT");
  }

  get emailTestMode(): boolean {
    return this.getRequired<boolean>("EMAIL_TEST_MODE");
  }

  get emailTestUsers(): string {
    return this.getRequired<string>("EMAIL_TEST_USERS");
  }

  get tenantBaseUrl(): string {
    return this.getRequired<string>("TENANT_BASE_URL");
  }

  get accessKey(): string {
    return this.getRequired<string>("ACCESS_KEY");
  }

  get secretKey(): string {
    return this.getRequired<string>("SECRET_KEY");
  }

  get region(): string {
    return this.getRequired<string>("BUCKET_REGION");
  }

  get bucketName(): string {
    return this.getRequired<string>("BUCKET_NAME");
  }

  get mobileOtpUrl(): string {
    return this.getRequired<string>("MOBILE_NOTIFICATION_URL");
  }

  get mobileOptTemplate(): string {
    return this.getRequired<string>("MOBILE_LOGIN_TEMPLATE");
  }
}
