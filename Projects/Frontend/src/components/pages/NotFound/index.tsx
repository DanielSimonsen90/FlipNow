import PageLayout from "../_Page";
import NotFound from "./NotFound";
import './NotFound.scss';

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found" description="This page does not exist.">
      <NotFound />
    </PageLayout>
  );
}