export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '.')
    .replace(/ /g, '');
}
