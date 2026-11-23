// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  let totalMinutes = 0;
  let count = 0;

  const todayTime = new Date(today).getTime();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  for (const record of records) {
    if (!record || !record.log_date) continue;

    const recordTime = new Date(record.log_date).getTime();
    const diffDays = (todayTime - recordTime) / ONE_DAY_MS;

    // 最近 7 天：包含今天及過去 6 天
    if (diffDays >= 0 && diffDays < 7) {
      count++;
      if (typeof record.minutes === 'number') {
        totalMinutes += record.minutes;
      }
    }
  }

  return { minutes: totalMinutes, count: count };
}
