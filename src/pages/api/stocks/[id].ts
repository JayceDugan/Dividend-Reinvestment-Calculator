import { NextApiRequest, NextApiResponse } from 'next';

const dividendUrl =
  'https://query1.finance.yahoo.com/v10/finance/quoteSummary/DHHF.AX?formatted=true&crumb=5f0PYwI93Du&lang=en-AU&region=AU&modules=assetProfile,topHoldings,defaultKeyStatistics,fundPerformance&corsDomain=au.finance.yahoo.com';

export default async function Stock(req: NextApiRequest, res: NextApiResponse) {
  const request = await fetch(dividendUrl);

  res.status(200).json(await request.json());
}
