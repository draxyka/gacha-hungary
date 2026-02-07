export type RedeemCode = {
  code: string;
  rewards: string;
};

export const CODES_DATA: Record<string, RedeemCode[]> = {
  'wuthering-waves': [
    {
      code: 'WUTHERINGGIFT',
      rewards: '50 Astrite, 2x Premium Resonance Potion, 2x Medium Revival Inhaler, 2x Medium Energy Bag, 10 000 Shell Credit',
    },
  ],
};
