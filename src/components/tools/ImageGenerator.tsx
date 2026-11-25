import React from 'react';
import { useApp } from '../../context/AppContext';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { StudioWorkspace } from './StudioWorkspace';

import modeArchImg from '../../assets/images/mode_architecture_1794987577559.jpg';
import modeInteriorImg from '../../assets/images/mode_interior_1794987578425.jpg';
import modeUrbanImg from '../../assets/images/mode_urban_1794987578552.jpg';
import modeLandscapeImg from '../../assets/images/mode_landscape_1794987579660.jpg';

export const ImageGenerator: React.FC = () => {
  const { t } = useApp();

  return (
    <StudioWorkspace
      toolId="render"
      toolName="Tạo Ảnh Kiến Trúc AI"
      dashboardTitle={t('modeSelectTitle')}
      dashboardSubtitle="Chọn không gian bạn muốn kiến tạo để hệ thống kích hoạt bộ thông số và phong cách tối ưu nhất"
      modes={[
        {
          id: 'architecture',
          title: t('modeArchitecture'),
          desc: t('modeArchitectureDesc'),
          icon: 'apartment',
          image: modeArchImg,
        },
        {
          id: 'interior',
          title: t('modeInterior'),
          desc: t('modeInteriorDesc'),
          icon: 'chair',
          image: modeInteriorImg,
        },
        {
          id: 'urban',
          title: t('modeUrban'),
          desc: t('modeUrbanDesc'),
          icon: 'location_city',
          image: modeUrbanImg,
        },
        {
          id: 'landscape',
          title: t('modeLandscape'),
          desc: t('modeLandscapeDesc'),
          icon: 'park',
          image: modeLandscapeImg,
        },
      ]}
      samples={[
        { title: 'Phác thảo biệt thự hiện đại', image: ARCH_ASSETS.renovationBefore },
        { title: 'Phối cảnh biệt thự hồ bơi', image: modeArchImg },
        { title: 'Nội thất phòng khách Japandi', image: modeInteriorImg },
        { title: 'Cảnh quan sân vườn resort', image: modeLandscapeImg },
      ]}
      defaultPrompt="Biệt thự hiện đại 3 tầng, cấu trúc cantilever vươn dài, tường ốp gỗ sồi thermo và kính tràn viền, bể bơi vô cực phản chiếu ánh đèn hoàng hôn, cảnh quan nhiệt đới tối giản"
      autoPromptsByMode={{
        architecture: [
          'Biệt thự hiện đại 3 tầng, hệ lam nhôm chắn nắng vân gỗ, cửa kính hộp low-E kịch trần, hồ bơi tràn bờ, ánh hoàng hôn vàng cam phản xạ trên mặt nước, render quang học chân thực 8K',
          'Nhà phố mặt tiền 6m phong cách Indochine đương đại, gạch bông gió mỹ thuật, ban công cây xanh rủ tầng, ánh sáng ban mai mềm mại',
        ],
        interior: [
          'Phòng khách phong cách Japandi đương đại, tường bê tông mài kết hợp nan gỗ sồi, sofa cong bọc vải boucle tự nhiên, bàn trà travertine, nắng sớm rọi qua cửa kính lớn',
          'Phòng ngủ master sang trọng tông gỗ óc chó trầm ấm, vách đầu giường bọc da lộn, đèn hắt khe 3000K, view nhìn ra vườn nhiệt đới',
        ],
        urban: [
          'Phối cảnh tổng thể khu đô thị ven sông hiện đại lúc hoàng hôn, các khối tháp giật cấp phủ vườn treo sinh thái, tuyến phố đi bộ lát đá granite sống động',
          'Quảng trường thương mại trung tâm với mái vòm hữu cơ biophilic, mặt nước cảnh quan phản chiếu ánh đèn kiến trúc ban đêm',
        ],
        landscape: [
          'Sân vườn biệt thự nghỉ dưỡng nhiệt đới, lối đi đá bước dặm qua hồ cá koi, dương xỉ xanh mướt, đèn rọi cây ấm áp giờ vàng hoàng hôn',
          'Khu vực hồ bơi resort ngoài trời bao quanh bởi đá travertine, hàng dừa nghiêng bóng và chòi nghỉ gỗ tối giản',
        ],
      }}
      optionGroups={[
        {
          key: 'style',
          label: t('styleLabel'),
          defaultValue: 'Modern Minimalist',
          options: [
            { value: 'Modern Minimalist', label: 'Hiện đại tối giản' },
            { value: 'Japandi', label: 'Japandi Zen' },
            { value: 'Indochine', label: 'Đông Dương' },
            { value: 'Tropical Modern', label: 'Nhiệt đới hiện đại' },
            { value: 'Neoclassical', label: 'Tân cổ điển' },
            { value: 'Brutalism', label: 'Bê tông thô mộc' },
          ],
        },
        {
          key: 'buildingType',
          label: t('buildingTypeLabel'),
          defaultValue: 'Biệt thự đơn lập',
          options: [
            { value: 'Biệt thự đơn lập', label: 'Biệt thự đơn lập' },
            { value: 'Nhà phố mặt tiền', label: 'Nhà phố / Shophouse' },
            { value: 'Căn hộ Penthouse', label: 'Căn hộ Penthouse' },
            { value: 'Tòa nhà văn phòng', label: 'Cao ốc thương mại' },
            { value: 'Khu nghỉ dưỡng Resort', label: 'Resort / Bungalow' },
          ],
        },
        {
          key: 'lighting',
          label: t('lightingLabel'),
          defaultValue: 'Hoàng hôn (Golden Hour)',
          options: [
            { value: 'Hoàng hôn (Golden Hour)', label: 'Hoàng hôn ấm áp' },
            { value: 'Ban ngày tự nhiên', label: 'Nắng sớm trong trẻo' },
            { value: 'Đèn ấm ban đêm', label: 'Ban đêm đèn ấm' },
            { value: 'Ánh sáng khuếch tán', label: 'Khuếch tán dịu nhẹ' },
          ],
        },
        {
          key: 'weather',
          label: t('weatherLabel'),
          defaultValue: 'Trời quang mây',
          options: [
            { value: 'Trời quang mây', label: 'Trời quang mây' },
            { value: 'Mưa nhẹ phản chiếu', label: 'Mưa ướt phản chiếu' },
            { value: 'Sương mù ban mai', label: 'Sương mù ban mai' },
            { value: 'Nắng hè nhiệt đới', label: 'Nắng hè rực rỡ' },
          ],
        },
        {
          key: 'context',
          label: t('contextLabel'),
          defaultValue: 'Khu đô thị sinh thái',
          options: [
            { value: 'Khu đô thị sinh thái', label: 'Đô thị sinh thái' },
            { value: 'Ven biển nhiệt đới', label: 'Ven biển nhiệt đới' },
            { value: 'Đồi thông Đà Lạt', label: 'Đồi thông cao nguyên' },
            { value: 'Trung tâm phố thị', label: 'Phố thị sầm uất' },
          ],
        },
        {
          key: 'cameraAngle',
          label: 'Góc máy',
          defaultValue: 'Góc phối cảnh 3/4',
          options: [
            { value: 'Góc phối cảnh 3/4', label: 'Phối cảnh 3/4' },
            { value: 'Góc chính diện', label: 'Chính diện cân đối' },
            { value: 'Góc nhìn tầm mắt', label: 'Tầm mắt người đi' },
            { value: 'Flycam từ trên cao', label: 'Flycam toàn cảnh' },
          ],
        },
      ]}
      resultPoolsByMode={{
        architecture: [modeArchImg, ARCH_ASSETS.heroVilla, ARCH_ASSETS.renovationAfter, modeLandscapeImg],
        interior: [modeInteriorImg, ARCH_ASSETS.heroInterior, modeArchImg, modeLandscapeImg],
        urban: [modeUrbanImg, ARCH_ASSETS.landscapeUrban, modeArchImg, modeLandscapeImg],
        landscape: [modeLandscapeImg, modeArchImg, ARCH_ASSETS.landscapeUrban, modeInteriorImg],
      }}
      comparatorBeforeLabel="AI"
      comparatorAfterLabel="GỐC"
      emptyHintText="Tải ảnh phác thảo hoặc nhập mô tả ở cột bên trái, sau đó bấm BẮT ĐẦU RENDER để xem kết quả."
      guideTitle="Hướng dẫn sử dụng Render AI"
      guideSteps={[
        {
          title: 'Tải ảnh phác thảo',
          desc: 'Tải ảnh SketchUp, Revit, vẽ tay hoặc ảnh hiện trạng để AI giữ nguyên hình khối công trình.',
        },
        {
          title: 'Mô tả & cấu hình',
          desc: 'Chọn phong cách, ánh sáng, model và độ phân giải 1K–4K để mở khóa ảnh tham chiếu vật liệu.',
        },
        {
          title: 'So sánh & tải ảnh',
          desc: 'Kéo thanh trượt AI / GỐC trực tiếp trên khung ảnh kết quả để kiểm tra chi tiết trước khi tải về.',
        },
      ]}
      downloadPrefix="ACHIPICS_RENDER"
      zoomTitle="Bản Xem Phối Cảnh Chi Tiết"
    />
  );
};
