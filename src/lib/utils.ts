export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatAddress(parts: {
  street: string;
  postal: string;
  city: string;
  country: string;
}) {
  return `${parts.street}, ${parts.postal} ${parts.city}, ${parts.country}`;
}
