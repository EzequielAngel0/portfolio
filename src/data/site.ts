// Datos canonicos de contacto (doc 02). Locale-neutral: el correo, las URLs y
// los nombres de red social no se traducen.
import type { IconName } from '../components/ui/Icon.astro';

export const site = {
  email: 'barbosalomeliangelezequiel@gmail.com',
  location: 'Jalisco, México',
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/angelezequiel' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/EzequielAngel0' },
    { label: 'X', icon: 'x', url: 'https://x.com/Ezequiel27Angel' },
  ],
} as const satisfies {
  email: string;
  location: string;
  socials: readonly { label: string; icon: IconName; url: string }[];
};
