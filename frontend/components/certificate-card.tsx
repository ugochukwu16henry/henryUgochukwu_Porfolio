import Image from 'next/image';
import { Certificate } from '@/lib/types';

const normalizeImageUrl = (url: string) => {
  if (!url) return '';
  const railwayHost = 'henryugochukwuporfolio-production.up.railway.app';
  try {
    const parsed = new URL(url);
    if (parsed.hostname === railwayHost && parsed.protocol === 'http:') {
      parsed.protocol = 'https:';
      return parsed.toString();
    }
    return parsed.toString();
  } catch {
    return url;
  }
};

type Props = {
  item: Certificate;
};

export const CertificateCard = ({ item }: Props) => {
  return (
    <article className="glass-card overflow-hidden">
      {item.imageUrl ? (
        <div className="relative h-44 w-full">
          <Image src={normalizeImageUrl(item.imageUrl)} alt={item.title} fill className="object-cover" />
        </div>
      ) : null}
      <div className="space-y-2 p-4">
        <h3 className="font-semibold text-white">{item.title}</h3>
        <p className="text-sm text-subtle">{item.issuer}</p>
        {item.issuedDate ? <p className="text-xs text-subtle">Issued: {item.issuedDate}</p> : null}
        {item.credentialUrl ? (
          <a className="text-sm text-accent hover:underline" href={item.credentialUrl} target="_blank" rel="noreferrer">
            View Credential
          </a>
        ) : null}
      </div>
    </article>
  );
};
