const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// CSVファイルのパス
const publishedPapersPath = path.join(__dirname, '../data/rm_published_papers.csv');
const presentationsPath = path.join(__dirname, '../data/rm_presentations.csv');

// 出力先ディレクトリ
const outputDir = path.join(__dirname, '../public/api');

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// CSVの内容を読み込む関数
function readCsv(filePath) {
  const csvContent = fs.readFileSync(filePath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  const header = lines[1]; // 2行目をヘッダーとして使用
  const data = lines.slice(2).join('\n'); // 3行目以降をデータとして使用
  const parsedData = Papa.parse(`${header}\n${data}`, {
    header: true,
    skipEmptyLines: true
  });

  // 'null'や'NULL'などをnullに変換
  parsedData.data.forEach(row => {
    for (const key in row) {
      if (row[key] === 'null' || row[key] === 'NULL') {
        row[key] = null;
      }
    }
  });

  return parsedData;
}

// Trueの判定
function isTrue(value) {
  return value === 'TRUE' || value === 'True' || value === 'true' || value === true || value === 1 || value === '1';
}

// 論文CSVの処理
const papersResult = readCsv(publishedPapersPath);

// 発表CSVの処理
const presentationsResult = readCsv(presentationsPath);

// データ処理関数（前と同じ）
const formattedPapers = papersResult.data.map(paper => {
  let authors = '';
  if (paper['著者(英語)']) {
    authors = paper['著者(英語)'].replace(/^\[|\]$/g, '');
  } else if (paper['著者(日本語)']) {
    authors = paper['著者(日本語)'].replace(/^\[|\]$/g, '');
  }

  return {
    id: paper.ID || `paper-${Math.random().toString(36).substr(2, 9)}`,
    title: paper['タイトル(英語)'] || paper['タイトル(日本語)'] || 'Untitled',
    authors: authors,
    venue: paper['誌名(英語)'] || paper['誌名(日本語)'] || '',
    year: paper['出版年月'] ? paper['出版年月'].substring(0, 4) : '',
    month: paper['出版年月'] ? paper['出版年月'].substring(5) : '',
    doi: paper.DOI || '',
    isMainWork: isTrue(paper['主要な業績かどうか'])
  };
});

const formattedPresentations = presentationsResult.data.map(presentation => {
  let speakers = '';
  if (presentation['講演者(英語)']) {
    speakers = presentation['講演者(英語)'].replace(/^\[|\]$/g, '');
  } else if (presentation['講演者(日本語)']) {
    speakers = presentation['講演者(日本語)'].replace(/^\[|\]$/g, '');
  }

  let year = '';
  if (presentation['発表年月日']) {
    year = presentation['発表年月日'].substring(0, 4);
  } else if (presentation['開催年月日(From)']) {
    year = presentation['開催年月日(From)'].substring(0, 4);
  }

  let place = '';
  if (presentation['開催地(英語)']) {
    place = presentation['開催地(英語)'];
  } else if (presentation['開催地(日本語)']) {
    place = presentation['開催地(日本語)'];
  } else if (presentation['国・地域']) {
    place = presentation['国・地域'];
  }

  return {
    id: presentation.ID || `presentation-${Math.random().toString(36).substr(2, 9)}`,
    title: presentation['タイトル(英語)'] || presentation['タイトル(日本語)'] || 'Untitled',
    speakers: speakers,
    conference: presentation['会議名(英語)'] || presentation['会議名(日本語)'] || '',
    date: presentation['発表年月日'] || presentation['開催年月日(From)'] || '',
    year: year,
    place: place,
    isInvited: isTrue(presentation['招待の有無'])
  };
});

// 日付でソート
const sortedPapers = formattedPapers.sort((a, b) => {
  return (b.year + b.month) - (a.year + a.month);
});

const sortedPresentations = formattedPresentations.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

// APIファイルを作成
// 個別のJSONファイル
fs.writeFileSync(
  path.join(outputDir, 'papers.json'),
  JSON.stringify(sortedPapers, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'presentations.json'),
  JSON.stringify(sortedPresentations, null, 2)
);

// すべての年のリストを抽出
const yearsSet = new Set();
sortedPapers.forEach(paper => paper.year && yearsSet.add(paper.year));
sortedPresentations.forEach(presentation => presentation.year && yearsSet.add(presentation.year));
const years = Array.from(yearsSet).sort((a, b) => b - a);

// 年ごとのデータを作成
years.forEach(year => {
  const yearPapers = sortedPapers.filter(paper => paper.year === year);
  const yearPresentations = sortedPresentations.filter(presentation => presentation.year === year);

  // 年ごとのデータをJSONとして保存
  fs.writeFileSync(
    path.join(outputDir, `papers-${year}.json`),
    JSON.stringify(yearPapers, null, 2)
  );

  fs.writeFileSync(
    path.join(outputDir, `presentations-${year}.json`),
    JSON.stringify(yearPresentations, null, 2)
  );
});

// 利用可能な年のリストをJSONとして保存
fs.writeFileSync(
  path.join(outputDir, 'years.json'),
  JSON.stringify({ years }, null, 2)
);

console.log('APIファイルを生成しました');
