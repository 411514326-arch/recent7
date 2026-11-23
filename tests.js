// tests.js：測試都寫在這個檔。一條測試呼叫一次 addCase，格式見 README.md。

// 規則 1：只計算日期在今天（today）以及今天往前推 6 天（合計共 7 天）之內的紀錄，並依真實曆法計算跨月與跨年。
addCase({
  name: '規則 1：今天的紀錄與 6 天前的邊界紀錄都有算入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-17', minutes: 20 }
  ],
  expect: { minutes: 50, count: 2 }
});

addCase({
  name: '規則 1：真實曆法跨月計算（平年 3 月 1 日跨到 2 月 23 日）有算入',
  today: '2026-03-01',
  records: [
    { log_date: '2026-03-01', minutes: 40 },
    { log_date: '2026-02-23', minutes: 20 }
  ],
  expect: { minutes: 60, count: 2 }
});

addCase({
  name: '規則 1：真實曆法跨年計算（1 月 2 日跨到前一年 12 月 28 日）有算入',
  today: '2027-01-02',
  records: [
    { log_date: '2027-01-02', minutes: 15 },
    { log_date: '2026-12-28', minutes: 45 }
  ],
  expect: { minutes: 60, count: 2 }
});

// 規則 2：日期比今天更晚的未來紀錄，不計入筆數也不計入分鐘數。
addCase({
  name: '規則 2：明天的未來紀錄不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-24', minutes: 50 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 2：包含今天與未來的紀錄，只計算今天的紀錄',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-25', minutes: 40 }
  ],
  expect: { minutes: 30, count: 1 }
});

// 規則 3：日期比今天早超過 6 天的舊紀錄，不計入筆數也不計入分鐘數。
addCase({
  name: '規則 3：7 天前的舊紀錄（剛好在 7 天範圍外）不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 60 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：包含有效紀錄與很久以前的舊紀錄，只算有效紀錄',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: 25 },
    { log_date: '2026-10-01', minutes: 100 }
  ],
  expect: { minutes: 25, count: 1 }
});

// 規則 4：同一天若有多筆紀錄，每一筆都分開計算筆數並累加其分鐘數。
addCase({
  name: '規則 4：同一天有兩筆紀錄，筆數算 2 且分鐘數累加',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-23', minutes: 45 }
  ],
  expect: { minutes: 75, count: 2 }
});

// 規則 5：紀錄的 minutes 若為 null 或未提供，該筆紀錄仍計入筆數（count + 1），但分鐘數視為 0 不累加。
addCase({
  name: '規則 5：minutes 為 null 時，count 計 1 筆但 minutes 為 0',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: null }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 5：未提供 minutes 欄位時，count 計 1 筆但 minutes 為 0',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23' }
  ],
  expect: { minutes: 0, count: 1 }
});

// 規則 6：紀錄的 minutes 若為 0，該筆紀錄仍計入筆數（count + 1），分鐘數累加 0。
addCase({
  name: '規則 6：minutes 為 0 時，count 計 1 筆且 minutes 累加 0',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 0 }
  ],
  expect: { minutes: 0, count: 1 }
});

// 規則 7：紀錄的 minutes 若為負數，該筆紀錄仍計入筆數（count + 1），但分鐘數視為 0 不累加。
addCase({
  name: '規則 7：minutes 為負數時，count 計 1 筆且 minutes 不扣減（視為 0）',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: -20 }
  ],
  expect: { minutes: 0, count: 1 }
});

// 規則 8：若傳入的紀錄清單為空或沒有任何符合條件的紀錄，回傳 minutes 為 0 且 count 為 0。
addCase({
  name: '規則 8：傳入空的紀錄清單，回傳 0 分鐘與 0 筆',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 8：所有紀錄都在 7 天範圍外，回傳 0 分鐘與 0 筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-10', minutes: 30 },
    { log_date: '2026-11-30', minutes: 40 }
  ],
  expect: { minutes: 0, count: 0 }
});
