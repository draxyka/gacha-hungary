/** Character list item (from Prydwen character list page) */
export type CharacterListItem = {
  id: string;
  unitId: string;
  slug: string;
  name: string;
  rarity: '4' | '5';
  element: string;
  weapon: string;
  upcoming: boolean | null;
  isNew: boolean | null;
};

/** Skill multiplier row */
export type SkillMultiplier = {
  Name: string;
  Lv1: string;
  Lv2: string;
  Lv3: string;
  Lv4: string;
  Lv5: string;
  Lv6: string;
  Lv7: string;
  Lv8: string;
  Lv9: string;
  Lv10: string;
};

/** Character skill */
export type CharacterSkill = {
  name: string;
  category: string;
  type: string;
  description: { raw: string };
  multipliers: SkillMultiplier[] | null;
};

/** Ascension material item */
export type AscensionMaterialItem = {
  name: string;
  number: number;
};

/** Common material (used for both skill and character ascension) */
export type CommonMaterial = {
  name: string;
  number_skill: number;
  number_char: number;
};

/** All ascension materials for a character */
export type AscensionMaterials = {
  ascension: AscensionMaterialItem;
  breakthrough: AscensionMaterialItem;
  skill: AscensionMaterialItem;
  common: CommonMaterial[];
  skill_other: AscensionMaterialItem[];
};

/** Character detail (from Prydwen character detail page) */
export type CharacterDetail = {
  name: string;
  slug: string;
  rarity: '4' | '5';
  element: string;
  weapon: string;
  introduction: { raw: string } | null;
  review: { raw: string } | null;
  pros: { raw: string } | null;
  cons: { raw: string } | null;
  skills: CharacterSkill[];
  dupes: Record<string, { raw: string }>;
  voiceActors: { en: string; kr: string; jpn: string; cn: string };
  attributeBonus: {
    trace1: { stat: string; value: number };
    trace2: { stat: string; value: number };
  };
  videos: { video: string }[];
  endgameStats: { raw: string } | null;
  rotations: { raw: string } | null;
  ascensionMaterials: AscensionMaterials | null;
  releaseDate: string;
  isNew: boolean | null;
  upcoming: boolean | null;
  smallImage: PrydwenImage | null;
  cardImage: PrydwenImage | null;
};

export type PrydwenImage = {
  localFile: {
    childImageSharp: {
      gatsbyImageData: {
        images: {
          fallback: { src: string; srcSet: string };
        };
        width: number;
        height: number;
      };
    };
  };
};
