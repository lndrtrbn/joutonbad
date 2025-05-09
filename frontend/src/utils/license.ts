export function trimLicense(license: string): string {
  return license.replace(/^0+/, "");
}
