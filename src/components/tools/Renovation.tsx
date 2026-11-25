import React from 'react';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { StudioWorkspace } from './StudioWorkspace';

import renoFacadeImg from '../../assets/images/renovation_facade_1794989362282.jpg';
import modeInteriorImg from '../../assets/images/mode_interior_1794987578425.jpg';
import modeLandscapeImg from '../../assets/images/mode_landscape_1794987579660.jpg';
import modeArchImg from '../../assets/images/mode_architecture_1794987577559.jpg';

export const Renovation: React.FC = () => {
  return (
    <StudioWorkspace
      toolId="renovation"
      toolName="Cải Tạo Không Gian AI"
      dashboardTitle="Chọn chế độ Cải Tạo AI"
      dashboardSubtitle="Giữ nguyên khung kết cấu hiện trạng, tái thiết toàn bộ vật liệu mặt tiền, nội thất và cảnh quan theo phong cách mới"
      modes={[
        {
          id: 'facade',
          title: 'Cải tạo Mặt tiền',
          desc: 'Thay áo mới cho mặt đứng nhà phố, biệt thự cũ bằng lam gỗ, đá tự nhiên và kính.',
          icon: 'home_work',
          image: renoFacadeImg,
        },
        {
          id: 'living',
          title: 'Cải tạo Phòng khách',
          desc: 'Làm mới tường, trần, sàn và đồ nội thất phòng khách mà không thay đổi kết cấu.',
          icon: 'weekend',
          image: modeInteriorImg,
        },
        {
          id: 'kitchen',
          title: 'Cải tạo Phòng bếp',
          desc: 'Thiết kế lại hệ tủ bếp, bàn đảo đá và ánh sáng hiện đại từ ảnh phòng cũ.',
          icon: 'countertops',
          image: ARCH_ASSETS.heroInterior,
        },
        {
          id: 'garden',
          title: 'Cải tạo Sân vườn',
          desc: 'Biến khoảng sân trống hoặc ban công cũ thành khu vườn nghỉ dưỡng xanh mát.',
          icon: 'yard',
          image: modeLandscapeImg,
        },
      ]}
      uploadTitle="1. Tải ảnh hiện trạng công trình"
      uploadDragText="Kéo thả ảnh hiện trạng cần cải tạo"
      uploadFormatsText="Ảnh chụp điện thoại, hiện trạng nhà cũ hoặc ảnh flycam"
      samples={[
        { title: 'Hiện trạng mặt tiền nhà cũ', image: ARCH_ASSETS.renovationBefore },
        { title: 'Mặt tiền nhiệt đới sau cải tạo', image: renoFacadeImg },
        { title: 'Không gian phòng khách hiện đại', image: modeInteriorImg },
        { title: 'Sân vườn biệt thự sau cải tạo', image: modeLandscapeImg },
      ]}
      promptTitle="2. Mô tả phương án cải tạo"
      promptPlaceholder="Ví dụ: Giữ nguyên vị trí cột và sàn tầng, ốp mới lam gỗ nhựa ngoài trời kết hợp đá travertine sáng, thêm ban công cây xanh và đèn hắt tường..."
      defaultPrompt="Cải tạo mặt tiền theo phong cách Tropical Modern, giữ nguyên khung kết cấu tầng, ốp hệ lam gỗ nhựa ấm kết hợp đá travertine tự nhiên, cửa kính hộp viền đen và cây xanh ban công"
      autoPromptsByMode={{
        facade: [
          'Cải tạo mặt tiền nhà phố 3 tầng phong cách Tropical Modern, giữ nguyên hệ dầm cột, bọc mới lam gỗ chắn nắng và đá travertine, ban công cây xanh rủ tầng, ánh đèn nội thất ấm áp lúc chạng vạng',
          'Làm mới mặt đứng công trình theo hướng tối giản hiện đại, sơn hiệu ứng bê tông mài, bổ sung hệ kính trượt tràn viền và đèn rọi cột kiến trúc',
        ],
        living: [
          'Cải tạo phòng khách cũ sang phong cách Japandi ấm áp, sàn gỗ sồi sáng, vách TV ốp đá tự nhiên kết hợp nan gỗ, sofa boucle bo cong và rèm voan đón nắng',
          'Nâng cấp phòng khách hiện đại với trần giật cấp tối giản, đèn khe LED 3000K và nội thất trung tính sang trọng',
        ],
        kitchen: [
          'Cải tạo khu bếp cũ thành bếp đảo hiện đại, tủ bếp cánh phẳng phủ laminate vân gỗ óc chó, mặt đá thạch anh vân mây và hệ đèn thả tinh tế',
          'Bếp mở liên thông phòng ăn phong cách tối giản Bắc Âu, gạch thẻ trắng mờ kết hợp kệ gỗ mở và ánh sáng tự nhiên',
        ],
        garden: [
          'Cải tạo sân trước trống trải thành vườn nhiệt đới thư giãn, lát đá bazan xen cỏ Nhật, hồ nước nhỏ và đèn chiếu sáng cảnh quan ban đêm',
          'Nâng cấp sân thượng thành khu lounge ngoài trời có giàn pergola gỗ, ghế mây và bồn cây xanh bao quanh',
        ],
      }}
      optionGroups={[
        {
          key: 'renovationLevel',
          label: 'Mức độ can thiệp',
          defaultValue: 'Đổi mới toàn diện',
          options: [
            { value: 'Đổi mới toàn diện', label: 'Đổi mới vật liệu toàn diện' },
            { value: 'Cải tạo nhẹ', label: 'Cải tạo nhẹ (Sơn & Cây xanh)' },
            { value: 'Mở rộng hệ kính', label: 'Thay tường bằng hệ kính lớn' },
          ],
        },
        {
          key: 'targetStyle',
          label: 'Phong cách đích',
          defaultValue: 'Tropical Modern',
          options: [
            { value: 'Tropical Modern', label: 'Hiện đại Nhiệt đới' },
            { value: 'Modern Minimalist', label: 'Tối giản sang trọng' },
            { value: 'Indochine Heritage', label: 'Đông Dương tinh tế' },
            { value: 'Japandi', label: 'Japandi ấm cúng' },
          ],
        },
        {
          key: 'material',
          label: 'Vật liệu chủ đạo',
          defaultValue: 'Lam gỗ & Đá tự nhiên',
          options: [
            { value: 'Lam gỗ & Đá tự nhiên', label: 'Lam gỗ + Đá tự nhiên' },
            { value: 'Bê tông mài & Kính', label: 'Bê tông mài + Kính Low-E' },
            { value: 'Gạch bông gió & Thép', label: 'Gạch thông gió + Thép đen' },
          ],
        },
        {
          key: 'lighting',
          label: 'Ánh sáng & Thời điểm',
          defaultValue: 'Hoàng hôn đèn ấm',
          options: [
            { value: 'Hoàng hôn đèn ấm', label: 'Hoàng hôn bật đèn ấm' },
            { value: 'Ban ngày nắng nhẹ', label: 'Ban ngày nắng dịu' },
            { value: 'Buổi tối kiến trúc', label: 'Ban đêm rọi đèn ngoại thất' },
          ],
        },
        {
          key: 'greenery',
          label: 'Mảng xanh bổ sung',
          defaultValue: 'Vừa phải tự nhiên',
          options: [
            { value: 'Vừa phải tự nhiên', label: 'Vừa phải hài hòa' },
            { value: 'Phủ xanh đa tầng', label: 'Vườn treo đa tầng rủ' },
            { value: 'Tối giản điểm nhấn', label: 'Ít cây nhấn kiến trúc' },
          ],
        },
        {
          key: 'preservation',
          label: 'Giữ nguyên kết cấu',
          defaultValue: 'Cao (85%)',
          options: [
            { value: 'Cao (85%)', label: 'Giữ chặt khung gốc (85%)' },
            { value: 'Cân bằng (65%)', label: 'Linh hoạt hình khối (65%)' },
            { value: 'Sáng tạo mạnh (45%)', label: 'Tái thiết mạnh mẽ (45%)' },
          ],
        },
      ]}
      resultPoolsByMode={{
        facade: [renoFacadeImg, modeArchImg, ARCH_ASSETS.renovationAfter, ARCH_ASSETS.heroVilla],
        living: [modeInteriorImg, ARCH_ASSETS.heroInterior, renoFacadeImg, modeArchImg],
        kitchen: [modeInteriorImg, ARCH_ASSETS.heroInterior, renoFacadeImg, modeLandscapeImg],
        garden: [modeLandscapeImg, renoFacadeImg, ARCH_ASSETS.landscapeUrban, modeArchImg],
      }}
      comparatorBeforeLabel="SAU CẢI TẠO"
      comparatorAfterLabel="HIỆN TRẠNG"
      emptyHintText="Tải ảnh hiện trạng công trình ở Bước 1, chọn phong cách mới rồi bấm BẮT ĐẦU RENDER để xem phương án cải tạo."
      guideTitle="Hướng dẫn Cải Tạo Công Trình AI"
      guideSteps={[
        {
          title: 'Tải ảnh hiện trạng',
          desc: 'Chụp chính diện hoặc góc nghiêng rõ ràng mặt tiền hay không gian nội thất cũ cần cải tạo.',
        },
        {
          title: 'Chọn mức độ & vật liệu',
          desc: 'Điều chỉnh mức giữ nguyên kết cấu, vật liệu ốp mới và phong cách kiến trúc đích ở Bước 3.',
        },
        {
          title: 'Đối chiếu Trước / Sau',
          desc: 'Kéo thanh trượt SAU CẢI TẠO / HIỆN TRẠNG trực tiếp trên ảnh kết quả để thuyết trình khách hàng.',
        },
      ]}
      downloadPrefix="ACHIPICS_RENOVATION"
      zoomTitle="Bản Xem Phương Án Cải Tạo"
    />
  );
};
