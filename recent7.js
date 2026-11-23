// recent7.js：照 rules.md 寫的版本
// 輸入：records＝一串紀錄，每筆像 { log_date: '2026-11-23', minutes: 30 }（minutes 可能是 null）
//       today＝今天的日期，例如 '2026-11-23'
// 輸出：{ minutes: 總共幾分鐘, count: 幾筆 }
// 格式說明在 README.md；要怎麼算看 rules.md。

function recent7(records, today) {
  let minutes = 0;
  let count = 0;

  if (!records || !Array.isArray(records)) {
    return { minutes, count };
  }

  const [tY, tM, tD] = today.split('-').map(Number);
  const todayTime = Date.UTC(tY, tM - 1, tD);
  const startTime = Date.UTC(tY, tM - 1, tD - 6);

  for (const record of records) {
    if (!record || !record.log_date) continue;

    const [rY, rM, rD] = record.log_date.split('-').map(Number);
    const recordTime = Date.UTC(rY, rM - 1, rD);

    if (recordTime >= startTime && recordTime <= todayTime) {
      count += 1;
      if (typeof record.minutes === 'number' && record.minutes > 0) {
        minutes += record.minutes;
      }
    }
  }

  return { minutes, count };
}
