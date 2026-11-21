import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  try {
    const searchImage = async (searchQuery: string) => {
      const result = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchQuery,
            per_page: 1,
          },
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      return result.data.results[0]?.urls?.regular || null;
    };


    let imageUrl = await searchImage(query);


    if (!imageUrl) {
      imageUrl = await searchImage(`${query} travel`);
    }

  
    if (!imageUrl) {
      imageUrl = await searchImage("travel destination");
    }

    return NextResponse.json({ imageUrl });

  } catch (error) {
    return NextResponse.json({ imageUrl: null });
  }
}
