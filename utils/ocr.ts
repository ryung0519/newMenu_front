// 줄 단위로 그룹핑 함수 (y좌표 기준)
const groupByLine = (fields: any[]) => {
  const lines: Record<number, string[]> = {};

  fields.forEach(field => {
    const y = field.boundingPoly?.vertices?.[0]?.y || 0;
    const key = Math.round(y / 10) * 10; // 대략적인 줄 구분

    if (!lines[key]) lines[key] = [];
    lines[key].push(field.inferText);
  });

  return Object.values(lines)
    .map(words => words.join(' '))
    .filter(line => line.trim().length > 0);
};

export const analyzeReceiptOCR = async (
  imageUri: string,
): Promise<string[]> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'receipt.jpg',
    } as any);

    const payload = {
      version: 'V2',
      requestId: Date.now().toString(),
      timestamp: Date.now(),
      images: [{format: 'jpg', name: 'receipt'}],
    };

    formData.append('message', JSON.stringify(payload));

    const response = await fetch(
      'https://obb74rkhpt.apigw.ntruss.com/custom/v1/41236/2c702e01f4117ae76b39ae74eeeb1451aba7abc557a078c64b68f86cb2d57600/general',
      {
        method: 'POST',
        headers: {
          'X-OCR-SECRET': 'TVR3bEh2T1F1ZUJ3WHdjSXB1RmJnbEhHbGRncnJsZkQ=',
        },
        body: formData,
      },
    );

    const result = await response.json();
    console.log('📦 CLOVA OCR 응답 (raw):', result);

    const fields = result.images?.[0]?.fields ?? [];
    const lines = groupByLine(fields);
    console.log('📄 줄 단위 OCR 결과:', lines);

    return lines;
  } catch (error) {
    console.error('❌ CLOVA OCR 실패:', error);
    return [];
  }
};

export const extractDaisoReceiptInfo = (texts: string[]) => {
  const containsDaiso = texts.some(text => text.includes('다이소'));
  if (!containsDaiso) {
    console.warn('❌ 다이소 영수증이 아닙니다.');
    return null;
  }

  const products: {name: string; price: string}[] = [];
  const blacklist = [
    '결제',
    '할인',
    '환불',
    '승인',
    '문의',
    '소요',
    '합계',
    '부가세',
    '포장',
    '카드',
    '현금',
  ];

  for (const line of texts) {
    if (!/[가-힣]/.test(line) || !/\d/.test(line)) continue;
    if (blacklist.some(word => line.includes(word))) continue;

    const cleaned = line.replace(/[()]/g, '').trim();
    const parts = cleaned.split(' ').filter(p => p.trim().length > 0);

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i].replace(/[^\d]/g, '');
      if (/^\d{3,6}$/.test(p)) {
        const price = `${p}원`;
        const name = parts.slice(0, i).join(' ').trim();

        const isValidName = /[가-힣]{2,}/.test(name);
        const isLongEnough = name.length >= 3;
        const isNotBlacklisted = !blacklist.some(word => name.includes(word));

        if (isValidName && isLongEnough && isNotBlacklisted) {
          products.push({name, price});
        }
        break;
      }
    }
  }

  return {
    storeName: '다이소',
    products,
  };
};
