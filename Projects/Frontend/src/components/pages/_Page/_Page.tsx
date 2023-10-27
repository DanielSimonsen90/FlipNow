import { useEffectOnce } from "danholibraryrjs";
import PageProps from "./_PageProps";

const DOMAIN_NAME = "FlipNow";

export default function PageLayout({ title, description, children, thumbnail }: PageProps) {
  useEffectOnce(() => {
    document.title = title ? `${title} - ${DOMAIN_NAME}` : DOMAIN_NAME;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);

    if (thumbnail) document.querySelector('meta[name="thumbnail"]')?.setAttribute("content", thumbnail);
  });

  return <>{children}</>;
}