export interface PageHeaderProps {
  title: string;
  lede?: string;
}

/** A page's `h1` and its one-line description. */
export function PageHeader({ title, lede }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-[26px] font-semibold tracking-[-0.022em] text-balance">
        {title}
      </h1>
      {lede && <p className="mt-1 max-w-[66ch] text-[14.5px] text-muted">{lede}</p>}
    </header>
  );
}
