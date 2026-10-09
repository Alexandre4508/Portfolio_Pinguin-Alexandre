import { useEffect, useState } from 'react';
import { Globe, Shield, Network, Monitor, Server, Wifi, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Couleurs du site (versions claires pour bien ressortir sur le fond sombre)
const BLUE = 'hsl(210 100% 68%)';
const GREEN = 'hsl(150 60% 55%)';
const WHITE = '#ffffff';

type Pt = { x: number; y: number };
type Layout = 'h' | 'v' | 's';

interface NodeDef {
  id: string;
  icon: LucideIcon;
  color: string;
  labelKey: string;
  prefix?: string;
  // h = horizontal (section pleine largeur), v = vertical étroit, s = compact (colonne de l'en-tête)
  pos: Record<Layout, Pt>;
}

const NODES: NodeDef[] = [
  { id: 'internet', icon: Globe, color: BLUE, labelKey: 'network.internet',
    pos: { h: { x: 80, y: 185 }, v: { x: 170, y: 50 }, s: { x: 210, y: 48 } } },
  { id: 'firewall', icon: Shield, color: GREEN, labelKey: 'network.firewall',
    pos: { h: { x: 290, y: 185 }, v: { x: 170, y: 165 }, s: { x: 210, y: 150 } } },
  { id: 'switch', icon: Network, color: BLUE, labelKey: 'network.switch',
    pos: { h: { x: 500, y: 185 }, v: { x: 170, y: 280 }, s: { x: 210, y: 252 } } },
  { id: 'pc', icon: Monitor, color: GREEN, labelKey: 'network.vlan.pc', prefix: 'VLAN 10',
    pos: { h: { x: 790, y: 70 }, v: { x: 55, y: 470 }, s: { x: 70, y: 372 } } },
  { id: 'srv', icon: Server, color: BLUE, labelKey: 'network.vlan.srv', prefix: 'VLAN 20',
    pos: { h: { x: 790, y: 185 }, v: { x: 170, y: 470 }, s: { x: 210, y: 372 } } },
  { id: 'wifi', icon: Wifi, color: GREEN, labelKey: 'network.vlan.wifi', prefix: 'VLAN 30',
    pos: { h: { x: 790, y: 300 }, v: { x: 285, y: 470 }, s: { x: 350, y: 372 } } },
];

const LINKS: [string, string][] = [
  ['internet', 'firewall'],
  ['firewall', 'switch'],
  ['switch', 'pc'],
  ['switch', 'srv'],
  ['switch', 'wifi'],
];

const VIEWBOX: Record<Layout, string> = {
  h: '0 0 900 380',
  v: '0 0 340 560',
  s: '0 0 420 450',
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

// Courbe de Bézier entre deux points (horizontale ou verticale selon la disposition)
function curve(a: Pt, b: Pt, vertical: boolean) {
  if (vertical) {
    const my = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

interface NetworkDiagramProps {
  // "side" : petit schéma dans une colonne (en-tête) / "section" : bloc pleine largeur avec titre
  variant?: 'side' | 'section';
}

const NetworkDiagram = ({ variant = 'side' }: NetworkDiagramProps) => {
  const { t } = useLanguage();
  const isNarrow = useMediaQuery('(max-width: 640px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const layout: Layout = variant === 'side' ? 's' : isNarrow ? 'v' : 'h';
  const vertical = layout !== 'h';
  const get = (n: NodeDef): Pt => n.pos[layout];
  const byId = (id: string) => NODES.find((n) => n.id === id)!;

  const svg = (
    <svg viewBox={VIEWBOX[layout]} className="w-full h-auto" role="img" aria-label={t('network.alt')}>
      <defs>
        <filter id="net-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Liens */}
      {LINKS.map(([from, to], i) => (
        <path
          key={`line-${i}`}
          d={curve(get(byId(from)), get(byId(to)), vertical)}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={2}
          strokeDasharray="6 8"
        >
          {!reduceMotion && (
            <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.6s" repeatCount="indefinite" />
          )}
        </path>
      ))}

      {/* Paquets lumineux : aller (vert) et retour (blanc) */}
      {!reduceMotion &&
        LINKS.map(([from, to], i) => {
          const a = get(byId(from));
          const b = get(byId(to));
          return (
            <g key={`packets-${i}`} filter="url(#net-glow)">
              <circle r={5} fill={GREEN}>
                <animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={curve(a, b, vertical)} />
              </circle>
              <circle r={4} fill={WHITE}>
                <animateMotion dur="2.6s" begin={`${i * 0.5 + 1.3}s`} repeatCount="indefinite" path={curve(b, a, vertical)} />
              </circle>
            </g>
          );
        })}

      {/* Nœuds */}
      {NODES.map((n, i) => {
        const { x, y } = get(n);
        const Icon = n.icon;
        return (
          <g key={n.id}>
            {!reduceMotion && (
              <circle cx={x} cy={y} r={36} fill="none" stroke={n.color} strokeWidth={2}>
                <animate attributeName="r" values="36;54" dur="2.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="2.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            )}

            <rect
              x={x - 34}
              y={y - 34}
              width={68}
              height={68}
              rx={16}
              fill="hsl(210 100% 20% / 0.85)"
              stroke={n.color}
              strokeWidth={2}
            />
            <Icon x={x - 16} y={y - 16} width={32} height={32} color={n.color} strokeWidth={1.8} />

            {n.prefix ? (
              <>
                <text x={x} y={y + 54} textAnchor="middle" fill={n.color} fontSize={12} fontWeight={700}>
                  {n.prefix}
                </text>
                <text x={x} y={y + 70} textAnchor="middle" fill={WHITE} fillOpacity={0.9} fontSize={13} fontWeight={600}>
                  {t(n.labelKey)}
                </text>
              </>
            ) : (
              <text x={x} y={y + 54} textAnchor="middle" fill={WHITE} fontSize={14} fontWeight={600}>
                {t(n.labelKey)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );

  // Version colonne (en-tête) : panneau en verre dépoli sur l'image de fond
  if (variant === 'side') {
    return (
      <div className="w-full max-w-md mx-auto rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md shadow-2xl p-4">
        {svg}
      </div>
    );
  }

  // Version section pleine largeur
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">{t('network.title')}</h3>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t('network.subtitle')}</p>
        <div className="max-w-4xl mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-tech-blue-dark to-secondary-dark p-4 md:p-8 overflow-hidden">
          {svg}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">{t('network.caption')}</p>
      </div>
    </section>
  );
};

export default NetworkDiagram;
