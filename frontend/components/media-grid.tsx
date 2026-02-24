import Image from 'next/image';
import { MediaAsset } from '@/lib/types';

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
  items: MediaAsset[];
};

export const MediaGrid = ({ items }: Props) => {
  if (!items.length) {
    return <p className="text-subtle">No additional photos yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="glass-card overflow-hidden">
          <div className="relative h-48 w-full">
            <Image src={normalizeImageUrl(item.imageUrl)} alt={item.title} fill className="object-cover" />
          </div>
          <div className="space-y-1 p-3">
            <h4 className="font-medium text-white">{item.title}</h4>
            <p className="text-xs uppercase text-subtle">{item.category}</p>
            {item.description ? <p className="text-sm text-subtle">{item.description}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
};
