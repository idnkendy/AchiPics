// Ultra-crisp architectural renders as inline vector SVGs with luxury gradients & atmospheric lighting

function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const ARCH_ASSETS = {
  // 1. Luxury Twilight Villa
  heroVilla: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0a1a"/>
          <stop offset="45%" stop-color="#1e1838"/>
          <stop offset="70%" stop-color="#3d2358"/>
          <stop offset="100%" stop-color="#80356c"/>
        </linearGradient>
        <linearGradient id="glowWarm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffe4b5"/>
          <stop offset="50%" stop-color="#ff9d42"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>
        <linearGradient id="poolGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f2b48"/>
          <stop offset="50%" stop-color="#144d6b"/>
          <stop offset="100%" stop-color="#071828"/>
        </linearGradient>
        <linearGradient id="concreteDark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#24272c"/>
          <stop offset="100%" stop-color="#181a1d"/>
        </linearGradient>
      </defs>
      <!-- Sky -->
      <rect width="1200" height="675" fill="url(#skyGrad)"/>
      <circle cx="950" cy="180" r="140" fill="#ff7e47" opacity="0.25" filter="blur(40px)"/>
      <!-- Distant Hills -->
      <path d="M0 450 Q300 390 600 420 T1200 390 L1200 675 L0 675 Z" fill="#0d0f17"/>
      <!-- Villa Upper Cantilever -->
      <polygon points="320,240 920,220 920,380 320,390" fill="url(#concreteDark)"/>
      <rect x="360" y="260" width="520" height="100" fill="#ffe9c4" opacity="0.9" rx="4"/>
      <!-- Window mullions -->
      <line x1="490" y1="260" x2="490" y2="360" stroke="#181a1d" stroke-width="6"/>
      <line x1="620" y1="260" x2="620" y2="360" stroke="#181a1d" stroke-width="6"/>
      <line x1="750" y1="260" x2="750" y2="360" stroke="#181a1d" stroke-width="6"/>
      <!-- Interior warm glow silhouettes -->
      <circle cx="560" cy="310" r="28" fill="#ffd17c" opacity="0.8"/>
      <!-- Ground Floor & Terrace -->
      <polygon points="260,380 980,370 1020,530 220,540" fill="#1d2026"/>
      <rect x="300" y="400" width="440" height="110" fill="#ffcb77" opacity="0.85"/>
      <line x1="410" y1="400" x2="410" y2="510" stroke="#14161a" stroke-width="6"/>
      <line x1="520" y1="400" x2="520" y2="510" stroke="#14161a" stroke-width="6"/>
      <line x1="630" y1="400" x2="630" y2="510" stroke="#14161a" stroke-width="6"/>
      <!-- Reflecting Pool -->
      <polygon points="180,530 1040,515 1160,675 40,675" fill="url(#poolGrad)"/>
      <!-- Pool Stepping Stones -->
      <polygon points="340,570 480,565 470,615 330,620" fill="#2d333b"/>
      <polygon points="520,565 660,560 650,610 510,615" fill="#2d333b"/>
      <polygon points="700,560 840,555 830,605 690,610" fill="#2d333b"/>
      <!-- Water Reflection Glow -->
      <rect x="300" y="535" width="440" height="70" fill="#ff9d42" opacity="0.35" filter="blur(8px)"/>
      <!-- Architectural Framing Badge -->
      <text x="50" y="60" fill="#ffffff" font-family="'Inter',sans-serif" font-weight="700" font-size="20" letter-spacing="3">OPZEN ARCHITECTURE</text>
      <text x="50" y="85" fill="#9d4edd" font-family="'Inter',sans-serif" font-weight="600" font-size="13" letter-spacing="1">GEMINI 2.0 NEURAL RENDER · 4K</text>
    </svg>
  `),

  // 2. Japandi Minimalist Living Room
  heroInterior: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ece8e1"/>
          <stop offset="100%" stop-color="#d8d1c5"/>
        </linearGradient>
        <linearGradient id="floorWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a47d57"/>
          <stop offset="100%" stop-color="#735334"/>
        </linearGradient>
        <linearGradient id="sofaBoucle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#fdfcf9"/>
          <stop offset="100%" stop-color="#e8e5dc"/>
        </linearGradient>
      </defs>
      <!-- Walls -->
      <rect width="1200" height="675" fill="url(#wallGrad)"/>
      <!-- Large Floor-to-ceiling Window -->
      <rect x="700" y="60" width="440" height="460" fill="#b9ddf5" rx="8"/>
      <!-- Window View: Bamboo Garden -->
      <rect x="700" y="60" width="440" height="460" fill="#a0c7aa" opacity="0.4"/>
      <path d="M720,200 Q780,240 760,520" stroke="#486e4e" stroke-width="12" fill="none"/>
      <path d="M790,160 Q830,220 810,520" stroke="#3b5e41" stroke-width="14" fill="none"/>
      <path d="M890,140 Q940,210 930,520" stroke="#315237" stroke-width="15" fill="none"/>
      <!-- Window mullions -->
      <line x1="840" y1="60" x2="840" y2="520" stroke="#222" stroke-width="8"/>
      <line x1="980" y1="60" x2="980" y2="520" stroke="#222" stroke-width="8"/>
      <!-- Oak Slat Accent Wall Left -->
      <pattern id="oakSlats" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="14" height="24" fill="#a47d57"/>
        <rect x="14" width="10" height="24" fill="#2d2218"/>
      </pattern>
      <rect x="80" y="80" width="340" height="440" fill="url(#oakSlats)"/>
      <!-- Hardwood Floor -->
      <polygon points="0,500 1200,500 1200,675 0,675" fill="url(#floorWood)"/>
      <!-- Luxury Boucle Curved Sofa -->
      <path d="M260,460 C260,390 380,370 600,380 C820,390 880,450 880,510 L280,530 Z" fill="url(#sofaBoucle)"/>
      <!-- Fluted Travertine Coffee Table -->
      <ellipse cx="620" cy="550" rx="140" ry="45" fill="#f2efe9"/>
      <ellipse cx="620" cy="542" rx="140" ry="45" fill="#ffffff"/>
      <!-- Ceramic Vase & Dry Botanical -->
      <ellipse cx="640" cy="515" rx="16" ry="24" fill="#2d2a26"/>
      <path d="M640,490 Q655,440 680,420" stroke="#5a4d3f" stroke-width="3" fill="none"/>
      <!-- Sunbeam Cast -->
      <polygon points="700,60 1140,60 780,675 320,675" fill="#ffffff" opacity="0.18"/>
      <!-- Branding Tag -->
      <text x="50" y="60" fill="#2c2825" font-family="'Inter',sans-serif" font-weight="700" font-size="20" letter-spacing="3">JAPANDI LIVING</text>
      <text x="50" y="85" fill="#7f13ec" font-family="'Inter',sans-serif" font-weight="600" font-size="13" letter-spacing="1">INTERIOR RENDERING · GEMINI 3.0</text>
    </svg>
  `),

  // 3. Renovation Before / After
  renovationBefore: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#d4d4d8"/>
      <!-- Old Facade -->
      <rect x="140" y="120" width="520" height="420" fill="#9ca3af"/>
      <rect x="180" y="160" width="160" height="120" fill="#4b5563"/>
      <rect x="440" y="160" width="160" height="120" fill="#4b5563"/>
      <!-- Old Cracks & Stains -->
      <path d="M220,180 Q250,290 230,380" stroke="#374151" stroke-width="4" fill="none" opacity="0.6"/>
      <path d="M490,200 Q520,310 510,400" stroke="#374151" stroke-width="3" fill="none" opacity="0.6"/>
      <rect x="330" y="380" width="120" height="160" fill="#6b7280"/>
      <!-- Ground -->
      <rect y="540" width="800" height="60" fill="#52525b"/>
      <rect x="20" y="20" width="140" height="36" rx="6" fill="#18181b" opacity="0.8"/>
      <text x="45" y="44" fill="#ef4444" font-family="'Inter',sans-serif" font-weight="700" font-size="14">HIỆN TRẠNG CŨ</text>
    </svg>
  `),

  renovationAfter: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="modernSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
        <linearGradient id="warmLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ffedd5"/>
          <stop offset="100%" stop-color="#fed7aa"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#modernSky)"/>
      <!-- Ultra-Modern Villa Facade -->
      <polygon points="120,100 680,80 660,540 140,540" fill="#1e293b"/>
      <!-- Black Steel & Timber Cladding -->
      <rect x="160" y="120" width="220" height="200" fill="#ca8a04" opacity="0.85"/>
      <rect x="420" y="120" width="220" height="200" fill="url(#warmLight)"/>
      <!-- Floor-to-ceiling glass -->
      <rect x="180" y="360" width="440" height="160" fill="#38bdf8" opacity="0.75"/>
      <!-- Exterior Up-and-Down Wall Washers -->
      <polygon points="135,260 120,160 150,160" fill="#fbbf24" opacity="0.8" filter="blur(6px)"/>
      <polygon points="135,260 120,360 150,360" fill="#fbbf24" opacity="0.8" filter="blur(6px)"/>
      <polygon points="665,260 650,160 680,160" fill="#fbbf24" opacity="0.8" filter="blur(6px)"/>
      <!-- Tropical Landscaping -->
      <circle cx="120" cy="520" r="45" fill="#15803d"/>
      <circle cx="680" cy="510" r="55" fill="#166534"/>
      <rect x="20" y="20" width="160" height="36" rx="6" fill="#18181b" opacity="0.8"/>
      <text x="35" y="44" fill="#22c55e" font-family="'Inter',sans-serif" font-weight="700" font-size="14">AI CẢI TẠO 4K</text>
    </svg>
  `),

  // 4. 3D Isometric Floor Plan
  floorPlan3D: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgIso" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#09090b"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgIso)"/>
      <!-- Isometric Ground Plate -->
      <polygon points="400,80 720,240 400,460 80,290" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
      <!-- Master Bedroom -->
      <polygon points="260,200 400,130 490,180 350,250" fill="#3f3f46"/>
      <!-- Bed Isometric -->
      <polygon points="310,195 380,160 415,180 345,215" fill="#e4e4e7"/>
      <polygon points="325,185 365,165 375,172 335,192" fill="#71717a"/>
      <!-- Living Area & Kitchen -->
      <polygon points="350,255 490,185 640,260 500,340" fill="#52525b"/>
      <!-- Sofa Isometric -->
      <polygon points="450,240 520,205 540,215 470,250" fill="#7f13ec"/>
      <!-- Dining Table -->
      <polygon points="420,285 470,260 495,275 445,300" fill="#d97706"/>
      <!-- Terrace with Green Plants -->
      <polygon points="505,345 645,265 685,285 545,370" fill="#047857"/>
      <circle cx="580" cy="315" r="14" fill="#10b981"/>
      <circle cx="610" cy="300" r="16" fill="#059669"/>
      <!-- Grid Dimensions Overlay -->
      <text x="400" y="520" fill="#a1a1aa" font-family="'Inter',sans-serif" font-weight="600" font-size="14" text-anchor="middle">TỔNG DIỆN TÍCH: 148 M² · 3 PHÒNG NGỦ · 2 WC</text>
      <text x="400" y="545" fill="#7f13ec" font-family="'Inter',sans-serif" font-weight="700" font-size="12" letter-spacing="2" text-anchor="middle">ISOMETRIC 3D CAD CONVERTER</text>
    </svg>
  `),

  // 5. Urban Landscape
  landscapeUrban: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
      <defs>
        <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="40%" stop-color="#581c87"/>
          <stop offset="70%" stop-color="#c026d3"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#sunset)"/>
      <circle cx="600" cy="420" r="180" fill="#fef08a" opacity="0.3" filter="blur(30px)"/>
      <!-- Skyline silhouette -->
      <polygon points="120,440 120,280 180,280 180,440" fill="#0f172a" opacity="0.8"/>
      <polygon points="220,440 220,240 290,240 290,440" fill="#0f172a" opacity="0.7"/>
      <polygon points="850,440 850,210 940,210 940,440" fill="#0f172a" opacity="0.75"/>
      <polygon points="980,440 980,260 1060,260 1060,440" fill="#0f172a" opacity="0.8"/>
      <!-- Biophilic Organic Canopy Pavilion -->
      <path d="M240,440 Q580,260 960,420 Q600,340 240,440 Z" fill="#e2e8f0"/>
      <!-- Curved Water Body -->
      <path d="M0,520 Q400,480 800,530 T1200,500 L1200,675 L0,675 Z" fill="#0284c7" opacity="0.85"/>
      <path d="M0,560 Q500,510 900,570 T1200,540 L1200,675 L0,675 Z" fill="#0369a1"/>
      <text x="50" y="60" fill="#ffffff" font-family="'Inter',sans-serif" font-weight="700" font-size="20" letter-spacing="3">BIOPHILIC URBAN WATERFRONT</text>
      <text x="50" y="85" fill="#38bdf8" font-family="'Inter',sans-serif" font-weight="600" font-size="13" letter-spacing="1">LANDSCAPE & URBAN DESIGN · 4K</text>
    </svg>
  `),
};

// 5 images for the 3D Carousel on the landing page
export const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Biệt Thự Hiện Đại Bên Hồ',
    subtitle: 'Ngoại thất Luxury Villa · Phong cách Minimalist',
    image: ARCH_ASSETS.heroVilla,
    badge: 'Render Kiến Trúc',
  },
  {
    id: 2,
    title: 'Phòng Khách Japandi Ấm Cúng',
    subtitle: 'Nội thất Gỗ Sồi Tự Nhiên & Ánh Sáng Ban Mai',
    image: ARCH_ASSETS.heroInterior,
    badge: 'Render Nội Thất',
  },
  {
    id: 3,
    title: 'Cải Tạo Mặt Tiền Nhà Phố Cũ',
    subtitle: 'Chuyển đổi vật liệu & hệ kính tràn viền',
    image: ARCH_ASSETS.renovationAfter,
    badge: 'Cải Tạo AI',
  },
  {
    id: 4,
    title: 'Mặt Bằng 3D Căn Hộ Penthouse',
    subtitle: 'Bản vẽ 2D sang phối cảnh isometric sống động',
    image: ARCH_ASSETS.floorPlan3D,
    badge: 'Floor Plan 3D',
  },
  {
    id: 5,
    title: 'Quảng Trường Sinh Thái Đô Thị',
    subtitle: 'Mô phỏng mặt nước & cấu trúc canopy hữu cơ',
    image: ARCH_ASSETS.landscapeUrban,
    badge: 'Quy Hoạch Cảnh Quan',
  },
];

// 10 Service highlights
export const SERVICE_HIGHLIGHTS = [
  {
    id: 'arch',
    titleKey: 'serviceArchTitle',
    descKey: 'serviceArchDesc',
    icon: 'Building2',
    image: ARCH_ASSETS.heroVilla,
    tag: 'Ngoại Thất',
    toolTarget: 'render',
  },
  {
    id: 'interior',
    titleKey: 'serviceInteriorTitle',
    descKey: 'serviceInteriorDesc',
    icon: 'Armchair',
    image: ARCH_ASSETS.heroInterior,
    tag: 'Nội Thất',
    toolTarget: 'render',
  },
  {
    id: 'renovation',
    titleKey: 'serviceRenovationTitle',
    descKey: 'serviceRenovationDesc',
    icon: 'RefreshCw',
    image: ARCH_ASSETS.renovationAfter,
    tag: 'Cải Tạo',
    toolTarget: 'renovation',
  },
  {
    id: 'floorplan',
    titleKey: 'serviceFloorPlanTitle',
    descKey: 'serviceFloorPlanDesc',
    icon: 'Layers',
    image: ARCH_ASSETS.floorPlan3D,
    tag: 'Mặt Bằng',
    toolTarget: 'floorplan',
  },
  {
    id: 'poster',
    titleKey: 'servicePosterTitle',
    descKey: 'servicePosterDesc',
    icon: 'Sparkles',
    image: ARCH_ASSETS.heroVilla,
    tag: 'Bất Động Sản',
    toolTarget: 'real-estate-poster',
  },
  {
    id: 'drawing',
    titleKey: 'serviceDrawingTitle',
    descKey: 'serviceDrawingDesc',
    icon: 'Compass',
    image: ARCH_ASSETS.floorPlan3D,
    tag: 'Kỹ Thuật',
    toolTarget: 'drawing-generator',
  },
  {
    id: 'analysis',
    titleKey: 'serviceAnalysisTitle',
    descKey: 'serviceAnalysisDesc',
    icon: 'Search',
    image: ARCH_ASSETS.heroInterior,
    tag: 'AI Vision',
    toolTarget: 'image-analysis',
  },
  {
    id: 'upscale',
    titleKey: 'serviceUpscaleTitle',
    descKey: 'serviceUpscaleDesc',
    icon: 'Maximize2',
    image: ARCH_ASSETS.heroVilla,
    tag: '2K / 4K',
    toolTarget: 'upscale',
  },
  {
    id: 'landscape',
    titleKey: 'serviceLandscapeTitle',
    descKey: 'serviceLandscapeDesc',
    icon: 'Trees',
    image: ARCH_ASSETS.landscapeUrban,
    tag: 'Sân Vườn',
    toolTarget: 'render',
  },
  {
    id: 'urban',
    titleKey: 'serviceUrbanTitle',
    descKey: 'serviceUrbanDesc',
    icon: 'MapPin',
    image: ARCH_ASSETS.landscapeUrban,
    tag: 'Quy Hoạch',
    toolTarget: 'render',
  },
];
