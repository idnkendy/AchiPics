import { Language } from '../types';

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

export const translations: Record<Language, Record<string, string>> = {
  vi: {
    // Header & Brand
    brandName: 'OPZEN AI',
    tagline: 'Nền tảng AI hàng đầu hỗ trợ KTS & NTK',
    navRender: 'Tạo ảnh',
    navFloorPlan: 'Floor Plan',
    navRenovation: 'Cải tạo',
    navViewSync: 'ViewSync',
    navEditor: 'Editor',
    navExtended: 'Mở rộng',
    navHistory: 'Lịch sử',
    navPricing: 'Bảng giá',
    navContact: 'Liên hệ',
    navTerms: 'Điều khoản',
    btnLogin: 'Đăng nhập',
    btnRegister: 'Đăng ký',
    btnStart: 'Bắt Đầu',
    btnStartDesigning: 'Bắt Đầu Thiết Kế',
    btnWatchDemo: 'Xem Demo',
    btnTopUp: '+Nạp',
    creditsText: 'Credits',

    // Hero
    poweredBy: 'Powered by Gemini 2.0 & 3.0 Pro',
    heroTitle1: 'KIẾN TẠO KHÔNG GIAN VỚI AI',
    heroTitle2: 'Nền tảng AI hàng đầu hỗ trợ KTS & NTK',
    heroDesc: 'Biến phác thảo, ý tưởng thô và mặt bằng thành hình ảnh render kiến trúc, nội thất quang học siêu thực chỉ trong vài giây. Tiết kiệm 90% thời gian dựng hình.',

    // Stats
    statUsers: '100,000+',
    statUsersLabel: 'Người dùng',
    statImages: '10,000,000+',
    statImagesLabel: 'Hình ảnh tạo ra',
    statTimeSaved: '90%',
    statTimeSavedLabel: 'Tiết kiệm thời gian',

    // Services
    servicesTitle: 'Dịch vụ nổi bật',
    serviceArchTitle: 'Render Kiến Trúc',
    serviceArchDesc: 'Render phối cảnh ngoại thất, biệt thự, nhà phố từ phác thảo hoặc ảnh thô.',
    serviceInteriorTitle: 'Render Nội Thất',
    serviceInteriorDesc: 'Hiện thực hóa không gian sống với ánh sáng tự nhiên và vật liệu cao cấp.',
    serviceRenovationTitle: 'Cải Tạo & Renovation',
    serviceRenovationDesc: 'Biến đổi mặt tiền cũ, nội thất xuống cấp thành kiến trúc hiện đại.',
    serviceFloorPlanTitle: 'Floor Plan 3D',
    serviceFloorPlanDesc: 'Chuyển đổi bản vẽ mặt bằng 2D CAD thành không gian 3D sống động.',
    servicePosterTitle: 'Poster Bất Động Sản',
    servicePosterDesc: 'Thiết kế ấn phẩm truyền thông, brochure BĐS chuyên nghiệp trong 1 chạm.',
    serviceDrawingTitle: 'Bản Vẽ Kỹ Thuật',
    serviceDrawingDesc: 'Tự động tạo bản vẽ khai triển, mặt đứng từ ảnh render.',
    serviceAnalysisTitle: 'Phân Tích Ảnh AI',
    serviceAnalysisDesc: 'Đánh giá bố cục, thông số vật liệu và ánh sáng công trình.',
    serviceUpscaleTitle: 'Upscale Độ Phân Giải',
    serviceUpscaleDesc: 'Nâng cấp chi tiết ảnh lên 2K, 4K sắc nét mà không vỡ hình.',
    serviceLandscapeTitle: 'Cảnh Quan Sân Vườn',
    serviceLandscapeDesc: 'Quy hoạch mảng xanh, hồ bơi, tiểu cảnh sân vườn nghệ thuật.',
    serviceUrbanTitle: 'Quy Hoạch Đô Thị',
    serviceUrbanDesc: 'Mô phỏng phối cảnh tổng thể khu dân cư và công trình công cộng.',

    // Feature Blocks
    featBlock1Title: 'Render Kiến Trúc AI Đỉnh Cao',
    featBlock1Desc: 'Công nghệ tạo hình thông minh giữ nguyên tỷ lệ cấu trúc, tự động hiểu bối cảnh địa phương Việt Nam và xu hướng toàn cầu.',
    featBlock1Item1: 'Chính xác tỉ lệ hình học, cửa sổ, dầm cột từ ảnh vẽ tay',
    featBlock1Item2: 'Đa dạng 30+ phong cách từ Indochine, Hiện đại, Japandi đến Cổ điển',
    featBlock1Item3: 'Tùy chỉnh linh hoạt thời tiết, ánh sáng ban ngày, hoàng hôn hoặc ban đêm',

    featBlock2Title: 'Cải Tạo Không Gian Siêu Nhanh',
    featBlock2Desc: 'Chụp ảnh hiện trạng công trình cũ và nhận ngay 4 phương án cải tạo ngoạn mục mà không cần dựng lại 3D từ đầu.',
    featBlock2Item1: 'Thay thế vật liệu đá hoa cương, gỗ ốp, kính phản quang tức thì',
    featBlock2Item2: 'Giữ nguyên khung kết cấu chịu lực theo thực tế',
    featBlock2Item3: 'Xuất ảnh so sánh Before / After trực quan để thuyết phục khách hàng',

    // Use cases
    useCasesTitle: 'Ai nên sử dụng OPZEN AI?',
    useCase1Title: 'Kiến Trúc Sư',
    useCase1Desc: 'Tăng tốc giai đoạn lên ý tưởng concept từ 3 ngày xuống còn 15 phút, trình bày nhiều phương án cho chủ đầu tư.',
    useCase2Title: 'Môi Giới BĐS',
    useCase2Desc: 'Tạo ảnh staging nội thất đẹp mắt cho căn hộ trống, tăng tỷ lệ chốt cọc nhanh gấp 3 lần.',
    useCase3Title: 'Chủ Nhà & Gia Chủ',
    useCase3Desc: 'Dễ dàng hình dung ngôi nhà tương lai trước khi thi công, tối ưu chi phí và tránh sửa đổi lãng phí.',

    // Modes
    modeSelectTitle: 'Chọn chế độ render',
    modeArchitecture: 'Kiến trúc',
    modeArchitectureDesc: 'Ngoại thất biệt thự, nhà phố, cao ốc & công trình thương mại',
    modeInterior: 'Nội thất',
    modeInteriorDesc: 'Phòng khách, phòng ngủ, bếp, văn phòng & khách sạn cao cấp',
    modeUrban: 'Đô thị',
    modeUrbanDesc: 'Quy hoạch phân khu, tổ hợp đô thị, công viên & đại lộ',
    modeLandscape: 'Cảnh quan',
    modeLandscapeDesc: 'Sân vườn, tiểu cảnh resort, hồ bơi & ban công xanh',

    // Generator UI
    uploadImage: 'Tải ảnh lên',
    dragDropText: 'Kéo thả ảnh hoặc click để chọn tệp',
    supportFormats: 'Hỗ trợ JPG, PNG, WEBP tối đa 20MB',
    referenceImages: 'Ảnh tham khảo (tối đa 3)',
    styleLabel: 'Phong cách',
    buildingTypeLabel: 'Loại công trình',
    lightingLabel: 'Ánh sáng',
    weatherLabel: 'Thời tiết',
    contextLabel: 'Bối cảnh',
    aspectRatioLabel: 'Tỉ lệ ảnh',
    resolutionLabel: 'Độ phân giải',
    aiModelLabel: 'AI Model',
    imageCountLabel: 'Số lượng ảnh',
    watermarkLabel: 'Watermark',
    promptPlaceholder: 'Mô tả chi tiết không gian bạn muốn tạo, vật liệu, ánh sáng, chi tiết...',
    autoPromptBtn: '✦ Tự động viết Prompt',
    costLabel: 'Chi phí:',
    generateBtn: 'TẠO ẢNH NGAY',
    generatingBtn: 'Đang xử lý...',
    tabGuide: 'Hướng dẫn sử dụng',
    tabResults: 'Kết quả tạo ảnh',
    btnDownload: 'Tải ảnh',
    btnDownloadAll: 'Tải tất cả (ZIP)',
    btnToViewSync: '→ Gửi sang ViewSync',
    btnToWatermark: '→ Xóa Watermark',
    btnFavorite: 'Yêu thích',
    beforeAfterTitle: 'So sánh Before / After',

    // Extended tools
    extendedTitle: 'Công cụ mở rộng',
    extendedSubtitle: 'Khám phá hệ sinh thái AI chuyên sâu dành riêng cho thiết kế kiến trúc',
    backToDashboard: '← Quay lại Dashboard',

    // Pricing
    pricingTitle: 'Bảng Giá Dịch Vụ',
    pricingSubtitle: 'Gói linh hoạt cho mọi nhu cầu từ cá nhân đến văn phòng thiết kế',
    btnSelectPlan: 'Chọn gói',
    currentPlan: 'Gói hiện tại',
    hotBadge: 'Phổ biến nhất',

    // User profile
    tabProfile: 'Hồ sơ',
    tabTransactions: 'Lịch sử giao dịch',
    tabUsageHistory: 'Lịch sử sử dụng',
    tabNotifications: 'Thông báo',
    logout: 'Đăng xuất',
  },
};
