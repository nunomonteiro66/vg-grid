import { Game } from "@/lib/igdb/helpers/types";
import prisma from "../prisma";

type SearchType = {
  id: number;
  igdbId: number;
  name: string;
  cover_url: string;
};

export async function search(
  searchTerm: string,
  offset = 0,
): Promise<SearchType[]> {
  const sanitized = searchTerm.trim();

  if (sanitized.length === 0) return [];

  const query = `${sanitized.split(/\s+/).join("&")}:*`;

  return prisma.$queryRaw`
    SELECT "igdbId" as id, "name", "coverUrl" from "Games"
    where search_vector @@ to_tsquery('english', ${query})
  `;
}
