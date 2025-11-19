import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  '0407K65KMD',
  '40a814cc7c4735d57a75ea476405e1cc'
);

const index = client.initIndex('jmkrobotics');

export interface SearchResult {
  title: string;
  type: 'machine' | 'solution' | 'page';
  url: string;
  description?: string;
}

export async function searchMachines(query: string): Promise<SearchResult[]> {
  if (!query) return [];

  const { hits } = await index.search<SearchResult>(query, { hitsPerPage: 8 });

  return hits.map(hit => ({
    title: hit.title,
    type: hit.type,
    url: hit.url,
    description: hit.description,
  }));
}
