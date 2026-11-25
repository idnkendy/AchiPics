import React from 'react';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { StudioWorkspace } from './StudioWorkspace';

import modeArchImg from '../../assets/images/mode_architecture_1794987577559.jpg';
import modeInteriorImg from '../../assets/images/mode_interior_1794987578425.jpg';
import modeUrbanImg from '../../assets/images/mode_urban_1794987578552.jpg';
import renoFacadeImg from '../../assets/images/renovation_facade_1794989362282.jpg';

export const ViewSync: React.FC = () => {
  return (
    <StudioWorkspace
      toolId="viewsync"
      toolName="ViewSync Đa Góc Nhìn"
      dashboardTitle="Chọn chế độ ViewSync AI"
      dashboardSubtitle="Giữ nguyên 100% hình khối, ngôn ngữ thiết kế và vật liệu công trình khi xoay camera sang các góc nhìn khác nhau"
      modes={[
        {
          id: 'sync',
          title: 'Đồng bộ Góc máy',
          desc: 'Xoay camera từ góc chính diện sang góc nghiêng 3/4 hoặc cận cảnh mà giữ nguyên kiến trúc.',
          icon: 'cameraswitch',
          image: modeArchImg,
        },
        {
          id: 'creative',
          title: 'Sáng tạo Góc mới',
          desc: 'Đề xuất các góc nhìn nghệ thuật tầm mắt người đi hoặc góc ngước ấn tượng.',
          icon: 'photo_camera',
          image: renoFacadeImg,
        },
        {
          id: 'batch',
          title: 'Bộ ảnh Đa góc',
          desc: 'Tạo đồng loạt nhiều biến thể góc nhìn nhất quán cho hồ sơ thuyết trình dự án.',
          icon: 'grid_view',
          image: modeUrbanImg,
        },
        {
          id: 'relight',
          title: 'Đồng bộ Ngày & Đêm',
          desc: 'Chuyển đổi cùng một góc phối cảnh qua các khung giờ bình minh, nắng trưa và ban đêm.',
          icon: 'wb_twilight',
          image: modeInteriorImg,
        },
      ]}
      uploadTitle="1. Tải ảnh góc neo chuẩn (Anchor)"
      uploadDragText="Kéo thả ảnh phối cảnh gốc làm góc neo"
      uploadFormatsText="Ảnh phối cảnh hoàn thiện dùng để khóa vật liệu & hình khối"
      samples={[
        { title: 'Biệt thự hồ bơi góc nghiêng', image: modeArchImg },
        { title: 'Mặt tiền biệt thự phố lúc chạng vạng', image: renoFacadeImg },
        { title: 'Nội thất phòng khách Japandi', image: modeInteriorImg },
        { title: 'Tổng thể đô thị ven sông', image: modeUrbanImg },
      ]}
      promptTitle="2. Mô tả góc nhìn & chuyển động camera"
      promptPlaceholder="Ví dụ: Xoay camera sang góc nghiêng 45 độ bên phải nhìn về sảnh chính, giữ nguyên hệ lam gỗ, màu đá và hồ bơi phản chiếu..."
      defaultPrompt="Xoay camera sang góc phối cảnh 45 độ bên phải tầm mắt người đi, giữ nguyên 100% tỷ lệ hình khối, vật liệu gỗ sồi, kính tràn viền và cảnh quan xung quanh"
      autoPromptsByMode={{
        sync: [
          'Chuyển sang góc phối cảnh 3/4 bên phải cách công trình 15 mét, giữ nguyên tuyệt đối hệ mái, ban công lam gỗ, vật liệu đá ốp và hồ bơi vô cực',
          'Góc nhìn chính diện cân đối trục lối vào công trình, bảo toàn toàn bộ chi tiết kiến trúc và ánh sáng từ ảnh neo gốc',
        ],
        creative: [
          'Góc nhìn ngước từ sân vườn hướng lên ban công tầng 2 và tầng 3, lấy tiền cảnh thảm cỏ và hàng cây xanh, giữ đồng nhất kiến trúc gốc',
          'Góc cận cảnh khu vực sảnh đón và mặt nước phản chiếu với độ sâu trường ảnh xóa phông nhẹ f/2.8',
        ],
        batch: [
          'Góc nhìn flycam từ trên cao xuống chếch 35 độ bao quát toàn bộ khuôn viên biệt thự, mái và sân vườn đồng nhất với ảnh gốc',
          'Góc phối cảnh bên hông nhìn qua hành lang kính và khu vực bàn ăn ngoài trời',
        ],
        relight: [
          'Giữ nguyên vị trí góc máy ảnh gốc, chuyển toàn bộ bầu trời sang giờ xanh hoàng hôn và bật sáng hệ đèn nội thất ấm 3000K hắt qua vách kính',
          'Chuyển đổi ánh sáng sang buổi sáng sớm nắng xiên dịu nhẹ, sương mỏng trên mặt hồ phản chiếu kiến trúc sắc nét',
        ],
      }}
      optionGroups={[
        {
          key: 'sourceAngle',
          label: 'Góc máy nguồn',
          defaultValue: 'Góc chính diện',
          options: [
            { value: 'Góc chính diện', label: 'Góc chính diện (Front)' },
            { value: 'Góc nghiêng 45° trái', label: 'Góc nghiêng 45° trái' },
            { value: 'Góc nghiêng 45° phải', label: 'Góc nghiêng 45° phải' },
            { value: 'Flycam trên cao', label: 'Flycam từ trên cao' },
          ],
        },
        {
          key: 'targetAngle',
          label: 'Góc máy đích',
          defaultValue: 'Góc nghiêng 45° bên hông',
          options: [
            { value: 'Góc nghiêng 45° bên hông', label: 'Góc nghiêng 45° bên hông' },
            { value: 'Cận cảnh sảnh vào', label: 'Cận cảnh sảnh vào' },
            { value: 'Tầm mắt người đi', label: 'Tầm mắt người đi (Eye-level)' },
            { value: 'Flycam toàn cảnh', label: 'Flycam toàn cảnh (Bird-eye)' },
          ],
        },
        {
          key: 'lens',
          label: 'Tiêu cự ống kính',
          defaultValue: '24mm Kiến trúc',
          options: [
            { value: '24mm Kiến trúc', label: '24mm Góc rộng chuẩn KTS' },
            { value: '35mm Tự nhiên', label: '35mm Góc nhìn tự nhiên' },
            { value: '50mm Chân dung khối', label: '50mm Đặc tả chi tiết' },
          ],
        },
        {
          key: 'consistency',
          label: 'Độ đồng nhất khối',
          defaultValue: 'Nghiêm ngặt (95%)',
          options: [
            { value: 'Nghiêm ngặt (95%)', label: 'Nghiêm ngặt (95%)' },
            { value: 'Cân bằng (80%)', label: 'Cân bằng (80%)' },
            { value: 'Mở rộng cảnh quan', label: 'Mở rộng bối cảnh xung quanh' },
          ],
        },
        {
          key: 'lighting',
          label: 'Ánh sáng mục tiêu',
          defaultValue: 'Đồng nhất ảnh gốc',
          options: [
            { value: 'Đồng nhất ảnh gốc', label: 'Đồng nhất với ảnh gốc' },
            { value: 'Hoàng hôn vàng', label: 'Giờ vàng hoàng hôn' },
            { value: 'Ban đêm đèn ấm', label: 'Ban đêm thắp đèn ấm' },
          ],
        },
        {
          key: 'context',
          label: 'Bối cảnh xung quanh',
          defaultValue: 'Giữ nguyên khuôn viên',
          options: [
            { value: 'Giữ nguyên khuôn viên', label: 'Giữ nguyên khuôn viên' },
            { value: 'Mở rộng sân vườn', label: 'Mở rộng sân vườn & cây xanh' },
            { value: 'Tuyến phố đô thị', label: 'Phối ghép tuyến phố đô thị' },
          ],
        },
      ]}
      resultPoolsByMode={{
        sync: [modeArchImg, renoFacadeImg, ARCH_ASSETS.heroVilla, modeUrbanImg],
        creative: [renoFacadeImg, modeArchImg, ARCH_ASSETS.renovationAfter, modeInteriorImg],
        batch: [modeArchImg, modeUrbanImg, renoFacadeImg, ARCH_ASSETS.landscapeUrban],
        relight: [ARCH_ASSETS.heroVilla, renoFacadeImg, modeArchImg, modeInteriorImg],
      }}
      comparatorBeforeLabel="GÓC MỚI AI"
      comparatorAfterLabel="ẢNH NEO GỐC"
      emptyHintText="Tải ảnh góc chuẩn ở Bước 1, chọn góc máy đích và số lượng biến thể rồi bấm BẮT ĐẦU RENDER."
      guideTitle="Hướng dẫn ViewSync Đồng Bộ Góc Nhìn"
      guideSteps={[
        {
          title: 'Đặt ảnh góc neo chuẩn',
          desc: 'Tải lên một ảnh phối cảnh hoàn thiện làm chuẩn mực cho hình khối, màu sắc và vật liệu.',
        },
        {
          title: 'Chọn góc máy & tiêu cự',
          desc: 'Thiết lập góc máy nguồn, góc máy đích (nghiêng 45°, flycam, cận cảnh) và độ đồng nhất khối.',
        },
        {
          title: 'Xuất bộ ảnh đồng bộ',
          desc: 'Kiểm tra từng góc sinh ra qua dải thumbnail bên dưới và đối chiếu trực tiếp với ảnh neo gốc.',
        },
      ]}
      downloadPrefix="ACHIPICS_VIEWSYNC"
      zoomTitle="Bản Xem Góc Nhìn Đồng Bộ"
    />
  );
};
