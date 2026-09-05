export function escapeHtml(value){
 return String(value)
  .replaceAll('&','&amp;')
  .replaceAll('<','&lt;')
  .replaceAll('>','&gt;')
  .replaceAll('"','&quot;')
  .replaceAll("'",'&#39;');
}

export function htmlValue(value){
 return escapeHtml(value).replaceAll('\n','<br>');
}

export function textLines(title,timestamp,fields){
 return [title,`Submitted: ${timestamp.toISOString()}`,'',...fields
  .filter(([,value])=>value!==undefined)
  .map(([label,value])=>`${label}: ${value}`)].join('\n');
}

export function htmlDocument(title,timestamp,fields){
 const rows=fields
  .filter(([,value])=>value!==undefined)
  .map(([label,value])=>`<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${htmlValue(value)}</td></tr>`)
  .join('');

 return `<h1>${escapeHtml(title)}</h1><p><strong>Submitted:</strong> ${escapeHtml(timestamp.toISOString())}</p><table><tbody>${rows}</tbody></table>`;
}
