import { getSiteContent } from "@/lib/content.server";
import { HomeClient } from "@/components/HomeClient";
import { ContentProvider } from "@/components/ContentProvider";

export default async function Home({ searchParams }: { searchParams: { preview?: string } }) {
  const isPreview = searchParams.preview === "true";
  const content = await getSiteContent(isPreview);

  return (
    <ContentProvider content={content}>
      <HomeClient />
      {isPreview && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-accent/20 backdrop-blur-xl border border-accent/40 px-6 py-3 rounded-full text-accent font-black tracking-widest text-[10px] uppercase shadow-2xl animate-pulse">
          Draft Preview Mode
        </div>
      )}
    </ContentProvider>
  );
}
