import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("listings")
      .select("title, city, neighbourhood, type, price, images")
      .eq("id", params.id)
      .single();

    if (!data) return { title: "Listing Not Found" };

    const title = `${data.title} — ${data.neighbourhood}, ${data.city}`;
    const description = `${data.type} for rent in ${data.neighbourhood}, ${data.city} at KSh ${data.price.toLocaleString()}/mo. Verified listing on Edira Kenya.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: data.images?.[0] ? [{ url: data.images[0] }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: data.images?.[0] ? [data.images[0]] : [],
      },
    };
  } catch {
    return { title: "Rental Listing | Edira Kenya" };
  }
}
