export interface IdentifyResponseDto {
  primaryContactId: number;
  emails: string[];
  phoneNumbers: number[];
  secondaryContactIds: number[];
}
