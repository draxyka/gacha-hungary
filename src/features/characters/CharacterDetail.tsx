'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CharacterDetail as CharacterDetailType } from './types/character.type';
import { getPrydwenImageSrc, richTextToHtml } from './characters.service';
import './character-content.css';

const ELEMENT_COLORS: Record<string, string> = {
  Aero: 'text-emerald-400',
  Electro: 'text-violet-400',
  Fusion: 'text-orange-400',
  Glacio: 'text-cyan-400',
  Havoc: 'text-rose-400',
  Spectro: 'text-yellow-400',
};

const ELEMENT_BG: Record<string, string> = {
  Aero: 'from-emerald-900/30',
  Electro: 'from-violet-900/30',
  Fusion: 'from-orange-900/30',
  Glacio: 'from-cyan-900/30',
  Havoc: 'from-rose-900/30',
  Spectro: 'from-yellow-900/30',
};

const ELEMENT_GLOW: Record<string, string> = {
  Aero: 'shadow-emerald-500/20',
  Electro: 'shadow-violet-500/20',
  Fusion: 'shadow-orange-500/20',
  Glacio: 'shadow-cyan-500/20',
  Havoc: 'shadow-rose-500/20',
  Spectro: 'shadow-yellow-500/20',
};

const ELEMENT_TAB_ACTIVE: Record<string, string> = {
  Aero: 'border-emerald-400 text-emerald-400',
  Electro: 'border-violet-400 text-violet-400',
  Fusion: 'border-orange-400 text-orange-400',
  Glacio: 'border-cyan-400 text-cyan-400',
  Havoc: 'border-rose-400 text-rose-400',
  Spectro: 'border-yellow-400 text-yellow-400',
};

type CharTranslation = {
  introduction?: string;
  review?: string;
  pros?: string;
  cons?: string;
  rotations?: string;
  endgameStats?: string;
  skills?: Record<string, string>;
  dupes?: Record<string, string>;
};

type Tab = 'skills' | 'sequences' | 'build' | 'review' | 'materials' | 'videos';

export default function CharacterDetailPage({
  character,
  translation,
}: {
  character: CharacterDetailType;
  translation?: CharTranslation;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('skills');
  const tr = translation;

  const imgSrc = getPrydwenImageSrc(character.cardImage);
  const elementColor = ELEMENT_COLORS[character.element] ?? 'text-white';
  const elementBg = ELEMENT_BG[character.element] ?? 'from-white/5';
  const elementGlow = ELEMENT_GLOW[character.element] ?? '';
  const tabActive = ELEMENT_TAB_ACTIVE[character.element] ?? 'border-white text-white';

  const introHtml = tr?.introduction ?? richTextToHtml(character.introduction?.raw);
  const reviewHtml = tr?.review ?? richTextToHtml(character.review?.raw);
  const prosHtml = tr?.pros ?? richTextToHtml(character.pros?.raw);
  const consHtml = tr?.cons ?? richTextToHtml(character.cons?.raw);
  const rotationsHtml = tr?.rotations ?? richTextToHtml(character.rotations?.raw);
  const endgameHtml = tr?.endgameStats ?? richTextToHtml(character.endgameStats?.raw);

  const dupeEntries = Object.entries(character.dupes)
    .filter(([key]) => key.startsWith('dupe'))
    .sort(([a], [b]) => a.localeCompare(b));

  const activeSkills = character.skills.filter((s) => s.category === 'Active' || s.category === 'Forte Circuit');
  const passiveSkills = character.skills.filter((s) => s.category === 'Inherent');
  const transitionSkills = character.skills.filter((s) => s.category === 'Transition');

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: 'skills', label: 'Képességek', show: character.skills.length > 0 },
    { id: 'sequences', label: 'Sequences', show: dupeEntries.length > 0 },
    { id: 'build', label: 'Build & Combo', show: !!(rotationsHtml || endgameHtml || prosHtml || consHtml) },
    { id: 'review', label: 'Értékelés', show: !!reviewHtml },
    { id: 'materials', label: 'Materials', show: !!character.ascensionMaterials },
    { id: 'videos', label: 'Videók', show: character.videos?.length > 0 },
  ];

  const visibleTabs = tabs.filter((t) => t.show);

  return (
    <section className="flex-1 py-16">
      <div className="wrapper">
        {/* Hero */}
        <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${elementBg} to-transparent border border-white/10 p-8 md:p-12 mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {imgSrc && (
              <div className={`w-48 md:w-64 shrink-0 shadow-2xl ${elementGlow} rounded-xl`}>
                <Image
                  src={imgSrc}
                  alt={`${character.name} — ${character.rarity}★ ${character.element} ${character.weapon}`}
                  width={374}
                  height={512}
                  unoptimized
                  priority
                  className="w-full h-auto rounded-xl"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <span className={`text-sm ${character.rarity === '5' ? 'text-amber-400' : 'text-purple-400'}`}>
                  {'★'.repeat(Number(character.rarity))}
                </span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold tracking-wide ${elementColor}`}>
                {character.name}
              </h1>
              <div className="flex items-center gap-4 mt-3 justify-center md:justify-start flex-wrap">
                <span className="text-white/60 text-sm uppercase tracking-wider">{character.element}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-white/60 text-sm uppercase tracking-wider">{character.weapon}</span>
                {character.releaseDate && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/40 text-sm">{character.releaseDate}</span>
                  </>
                )}
              </div>

              {/* Attribute Bonus */}
              {character.attributeBonus && (
                <div className="flex gap-4 mt-4 justify-center md:justify-start flex-wrap">
                  {[character.attributeBonus.trace1, character.attributeBonus.trace2].filter(Boolean).map((trace) => (
                    <span key={trace.stat} className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-lg">
                      {trace.stat}: <strong className="text-white/90">+{trace.value}%</strong>
                    </span>
                  ))}
                </div>
              )}

              {introHtml && (
                <div
                  className="mt-5 text-white/70 leading-relaxed max-w-2xl character-content"
                  dangerouslySetInnerHTML={{ __html: introHtml }}
                />
              )}

              {/* Voice Actors */}
              {character.voiceActors && Object.values(character.voiceActors).some((v) => v) && (
                <div className="mt-4 flex gap-x-6 gap-y-1 flex-wrap text-xs text-white/40">
                  {character.voiceActors.jpn && <span>JP: <span className="text-white/60">{character.voiceActors.jpn}</span></span>}
                  {character.voiceActors.en && <span>EN: <span className="text-white/60">{character.voiceActors.en}</span></span>}
                  {character.voiceActors.cn && <span>CN: <span className="text-white/60">{character.voiceActors.cn}</span></span>}
                  {character.voiceActors.kr && <span>KR: <span className="text-white/60">{character.voiceActors.kr}</span></span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8 overflow-x-auto">
          <nav className="flex gap-0 min-w-max">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? tabActive
                    : 'border-transparent text-white/40 hover:text-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div>
          {/* Skills tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {[...activeSkills, ...transitionSkills, ...passiveSkills].map((skill) => (
                <div key={skill.name} className="rounded-xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded uppercase tracking-wider">
                      {skill.type}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  </div>
                  <div
                    className="text-sm text-white/70 leading-relaxed character-content"
                    dangerouslySetInnerHTML={{ __html: tr?.skills?.[skill.name] ?? richTextToHtml(skill.description?.raw) }}
                  />
                  {skill.multipliers && skill.multipliers.length > 0 && (
                    <details className="mt-4">
                      <summary className="text-sm text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                        Multiplier táblázat
                      </summary>
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-xs text-white/60">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 pr-4 text-white/80 font-medium">Név</th>
                              {['Lv1', 'Lv5', 'Lv10'].map((lv) => (
                                <th key={lv} className="text-right py-2 px-2 text-white/80 font-medium">{lv}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {skill.multipliers.map((m, i) => (
                              <tr key={i} className="border-b border-white/5">
                                <td className="py-2 pr-4 text-white/70">{m.Name}</td>
                                <td className="text-right py-2 px-2">{m.Lv1}</td>
                                <td className="text-right py-2 px-2">{m.Lv5}</td>
                                <td className="text-right py-2 px-2">{m.Lv10}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Sequences tab */}
          {activeTab === 'sequences' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dupeEntries.map(([key, val], idx) => (
                <div key={key} className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <span className={`text-lg font-bold ${elementColor}`}>S{idx + 1}</span>
                  <div
                    className="mt-2 text-sm text-white/70 leading-relaxed character-content"
                    dangerouslySetInnerHTML={{ __html: tr?.dupes?.[key] ?? richTextToHtml(val.raw) }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Build & Combo tab */}
          {activeTab === 'build' && (
            <div className="space-y-10">
              {rotationsHtml && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Rotáció (Combo)</h3>
                  <div
                    className="character-content text-white/80 leading-relaxed rounded-xl bg-white/5 border border-white/10 p-6"
                    dangerouslySetInnerHTML={{ __html: rotationsHtml }}
                  />
                </div>
              )}

              {endgameHtml && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Ajánlott statok</h3>
                  <div
                    className="character-content text-white/80 leading-relaxed rounded-xl bg-white/5 border border-white/10 p-6"
                    dangerouslySetInnerHTML={{ __html: endgameHtml }}
                  />
                </div>
              )}

              {(prosHtml || consHtml) && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {prosHtml && (
                    <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-6">
                      <h3 className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">Előnyök</h3>
                      <div
                        className="text-sm text-white/70 leading-relaxed character-content"
                        dangerouslySetInnerHTML={{ __html: prosHtml }}
                      />
                    </div>
                  )}
                  {consHtml && (
                    <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-6">
                      <h3 className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-3">Hátrányok</h3>
                      <div
                        className="text-sm text-white/70 leading-relaxed character-content"
                        dangerouslySetInnerHTML={{ __html: consHtml }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Review tab */}
          {activeTab === 'review' && reviewHtml && (
            <div
              className="character-content text-white/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: reviewHtml }}
            />
          )}

          {/* Materials tab */}
          {activeTab === 'materials' && character.ascensionMaterials && (
            <div className="space-y-8">
              {/* Ascension & Breakthrough */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Ascension & Breakthrough</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Ascension Material</span>
                    <p className="text-white/90 font-medium mt-1">{character.ascensionMaterials.ascension.name}</p>
                    <p className="text-white/50 text-sm">x{character.ascensionMaterials.ascension.number}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Breakthrough Material</span>
                    <p className="text-white/90 font-medium mt-1">{character.ascensionMaterials.breakthrough.name}</p>
                    <p className="text-white/50 text-sm">x{character.ascensionMaterials.breakthrough.number}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Skill Material</span>
                    <p className="text-white/90 font-medium mt-1">{character.ascensionMaterials.skill.name}</p>
                    <p className="text-white/50 text-sm">x{character.ascensionMaterials.skill.number}</p>
                  </div>
                </div>
              </div>

              {/* Common Materials */}
              {character.ascensionMaterials.common?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Common Materials</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-white/70">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 pr-4 text-white/80 font-medium">Anyag</th>
                          <th className="text-right py-2 px-3 text-white/80 font-medium">Karakter</th>
                          <th className="text-right py-2 px-3 text-white/80 font-medium">Skill</th>
                        </tr>
                      </thead>
                      <tbody>
                        {character.ascensionMaterials.common.map((mat) => (
                          <tr key={mat.name} className="border-b border-white/5">
                            <td className="py-2 pr-4 text-white/90">{mat.name}</td>
                            <td className="text-right py-2 px-3">x{mat.number_char}</td>
                            <td className="text-right py-2 px-3">x{mat.number_skill}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Skill Other Materials */}
              {character.ascensionMaterials.skill_other?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Forgery Materials (Skill Upgrade)</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {character.ascensionMaterials.skill_other.map((mat) => (
                      <div key={mat.name} className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <p className="text-white/90 font-medium text-sm">{mat.name}</p>
                        <p className="text-white/50 text-sm">x{mat.number}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Videos tab */}
          {activeTab === 'videos' && character.videos?.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {character.videos.map((v) => (
                <div key={v.video} className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.video}`}
                    title={`${character.name} - YouTube videó`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Source */}
        <p className="text-center text-white/30 text-xs mt-12">
          Adatok forrása:{' '}
          <a
            href={`https://www.prydwen.gg/wuthering-waves/characters/${character.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/50 transition-colors"
          >
            Prydwen.gg
          </a>
        </p>
      </div>
    </section>
  );
}
