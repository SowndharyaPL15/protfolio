const fs = require('fs');

const html = fs.readFileSync('live_contrib.html', 'utf8');

const tableMatch = html.match(/<table[\s\S]*?class="[^"]*js-calendar-graph-table[^"]*"[\s\S]*?<\/table>/);

if (tableMatch) {
  const table = tableMatch[0];
  console.log('Full table length:', table.length);
  const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
  console.log('Total tr count (including thead):', rows.length);
  
  rows.forEach((r, idx) => {
    const th = r[1].match(/<span class="ContributionCalendar-label"[^>]*>([\s\S]*?)<\/span>/) || r[1].match(/<th[^>]*>([\s\S]*?)<\/th>/) || r[1].match(/<td[^>]*class="ContributionCalendar-label"[^>]*>([\s\S]*?)<\/td>/);
    const label = th ? th[1].replace(/<[^>]+>/g, '').trim() : 'none';
    const dayCells = [...r[1].matchAll(/<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g)];
    console.log(`Row ${idx}: label=${label}, day cells count=${dayCells.length}`);
    if (dayCells.length > 0) {
      console.log(`  First cell: ${dayCells[0][1]} (lvl ${dayCells[0][2]}), Last cell: ${dayCells[dayCells.length-1][1]} (lvl ${dayCells[dayCells.length-1][2]})`);
    }
  });
}
