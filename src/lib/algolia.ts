import { machinesData } from '@/data/individualMachines';

export interface SearchResult {
  title: string;
  type: 'machine' | 'solution' | 'page';
  url: string;
  description?: string;
}

export async function searchMachines(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) return [];

  const lowerQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const [key, machine] of Object.entries(machinesData)) {
    const matchesName = machine.machineName.toLowerCase().includes(lowerQuery);
    const matchesDesc = machine.description.toLowerCase().includes(lowerQuery);
    const matchesUses = machine.primaryUse.toLowerCase().includes(lowerQuery);
    const matchesApplications = machine.commonApplications.some(app =>
      app.toLowerCase().includes(lowerQuery)
    );

    if (matchesName || matchesDesc || matchesUses || matchesApplications) {
      results.push({
        title: machine.machineName,
        type: 'machine',
        url: `/machines/filling-dosing/${key}`,
        description: machine.description,
      });
    }
  }

  // Check solutions
  if ('bottling line'.includes(lowerQuery) || 'vial'.includes(lowerQuery) || 'line'.includes(lowerQuery)) {
    results.push({
      title: 'Integrated Vial Bottling Line',
      type: 'solution',
      url: '/en/machines',
      description: 'Complete integrated packaging and bottling solution for industrial vials.',
    });
  }

  return results.slice(0, 8);
}
