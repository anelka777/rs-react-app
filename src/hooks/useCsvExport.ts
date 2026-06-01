import type { Character } from '../types/character';

const useCsvExport = (items: Character[]): { handleDownload: () => void } => {
  const handleDownload = (): void => {
    const headers = 'name,status,species,gender,location,url\n';
    const rows = items
      .map(
        (c) =>
          `${c.name},${c.status},${c.species},${c.gender},${c.location.name},https://rickandmortyapi.com/api/character/${c.id}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${items.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { handleDownload };
};

export default useCsvExport;
