type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export const SectionTitle = ({ eyebrow, title, description }: Props) => (
  <div className="mb-8 space-y-2">
    <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
    <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
    {description ? <p className="max-w-3xl text-subtle">{description}</p> : null}
  </div>
);
