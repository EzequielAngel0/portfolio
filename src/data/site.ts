// Datos canonicos de contacto (doc 02). Locale-neutral: el correo, las URLs y
// los nombres de red social no se traducen.
import type { IconName } from '../components/ui/Icon.astro';

export const site = {
  email: 'barbosalomeliangelezequiel@gmail.com',
  location: 'Jalisco, México',
  // Contacto directo por WhatsApp (mismo numero del CV, ya publico). El deep-link
  // wa.me abre la app si esta instalada y WhatsApp Web si no.
  whatsapp: {
    display: '+52 33 2019 1633',
    url: 'https://wa.me/523320191633',
  },
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/angelezequiel' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/EzequielAngel0' },
    { label: 'X', icon: 'x', url: 'https://x.com/Ezequiel27Angel' },
  ],
} as const satisfies {
  email: string;
  location: string;
  whatsapp: { display: string; url: string };
  socials: readonly { label: string; icon: IconName; url: string }[];
};
