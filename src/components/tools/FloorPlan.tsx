import React from 'react';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { StudioWorkspace } from './StudioWorkspace';

import floorplanIsoImg from '../../assets/images/floorplan_iso_1794989299592.jpg';
import modeInteriorImg from '../../assets/images/mode_interior_1794987578425.jpg';
import modeUrbanImg from '../../assets/images/mode_urban_1794987578552.jpg';
import modeLandscapeImg from '../../assets/images/mode_landscape_1794987579660.jpg';

export const FloorPlan: React.FC = () => {
  return (
    <StudioWorkspace
      toolId="floorplan"
      toolName="Mặt Bằng 2D Sang 3D AI"
      dashboardTitle="Chọn chế độ Mặt Bằng 3D"
      dashboardSubtitle="Chuyển đổi bản vẽ mặt bằng CAD, PDF hoặc phác thảo 2D thành phối cảnh 3D đầy đủ nội thất, vật liệu và ánh sáng"
      modes={[
        {
          id: 'arch',
          title: 'Mặt bằng Kiến trúc',
          desc: 'Dựng mặt bằng cắt lớp 3D tổng thể nhà ở, biệt thự và công trình dân dụng.',
          icon: 'layers',
          image: floorplanIsoImg,
        },
        {
          id: 'interior',
          title: 'Mặt bằng Nội thất',
          desc: 'Tự động bố trí sofa, bàn ăn, giường ngủ và chất liệu sàn cho căn hộ 3D.',
          icon: 'chair',
          image: modeInteriorImg,
        },
        {
          id: 'urban',
          title: 'Tổng mặt bằng Quy hoạch',
          desc: 'Diễn họa 3D phân khu đô thị, trục giao thông và khối công trình từ bản vẽ.',
          icon: 'location_city',
          image: modeUrbanImg,
        },
        {
          id: 'landscape',
          title: 'Mặt bằng Cảnh quan',
          desc: 'Chuyển bản vẽ sân vườn 2D thành phối cảnh cây xanh, mặt nước và lối dạo.',
          icon: 'park',
          image: modeLandscapeImg,
        },
      ]}
      uploadTitle="1. Tải mặt bằng 2D (CAD / PDF / Ảnh)"
      uploadDragText="Kéo thả ảnh mặt bằng 2D vào đây"
      uploadFormatsText="Hỗ trợ PNG, JPG, bản xuất CAD/Revit độ nét cao"
      samples={[
        { title: 'Mặt bằng căn hộ 2 phòng ngủ', image: ARCH_ASSETS.renovationBefore },
        { title: 'Mẫu 3D Isometric hoàn thiện', image: floorplanIsoImg },
        { title: 'Mặt bằng phòng khách mở', image: modeInteriorImg },
        { title: 'Mặt bằng sân vườn biệt thự', image: modeLandscapeImg },
      ]}
      promptTitle="2. Mô tả không gian & vật liệu 3D"
      promptPlaceholder="Ví dụ: Mặt bằng căn hộ 120m2 phong cách Japandi, sàn gỗ sồi sáng, tường cắt lửng trắng sạch, ánh nắng ban ngày dịu nhẹ..."
      defaultPrompt="Mặt bằng căn hộ 3D Isometric cắt lớp sắc nét, sàn gỗ sồi tự nhiên kết hợp đá marble ở khu bếp, nội thất bọc vải boucle tối giản, ánh sáng ban ngày mềm mại"
      autoPromptsByMode={{
        arch: [
          'Mặt bằng biệt thự 3D Isometric cắt lớp sạch sẽ, tường trắng 200mm rõ nét, sàn gỗ sồi tự nhiên, nội thất hiện đại ấm cúng, đổ bóng mềm chuẩn trình bày kiến trúc',
          'Mặt bằng tổng thể tầng trệt nhà phố thông tầng có gara, bếp đảo và giếng trời cây xanh, ánh sáng tự nhiên rọi thẳng',
        ],
        interior: [
          'Phối cảnh mặt bằng nội thất căn hộ 2 phòng ngủ phong cách Japandi, sofa cong kem, bàn ăn gỗ óc chó, thảm len dệt, ánh nắng sớm rọi qua ban công kính',
          'Mặt bằng penthouse sang trọng tông be ấm, đá travertine phòng tắm, đèn led hắt khe tinh tế',
        ],
        urban: [
          'Tổng mặt bằng quy hoạch khu đô thị ven sông 3D, phân khu biệt thự và cao tầng giật cấp, công viên trung tâm xanh mát, nước hồ phản chiếu trong trẻo',
          'Diễn họa mặt bằng tổ hợp thương mại đa chức năng, đường dạo bộ lát đá và quảng trường cây xanh',
        ],
        landscape: [
          'Mặt bằng sân vườn biệt thự nhiệt đới 3D, hồ cá koi uốn lượn, sàn gỗ deck ngoài trời, đá bước dặm trên thảm cỏ Nhật và cụm cây cọ xanh mướt',
          'Phối cảnh mặt bằng công viên resort với hồ bơi vô cực trung tâm, chòi nghỉ và hàng dừa bóng mát',
        ],
      }}
      optionGroups={[
        {
          key: 'planType',
          label: 'Kiểu phối cảnh 3D',
          defaultValue: 'Isometric 3D Cắt Lớp',
          options: [
            { value: 'Isometric 3D Cắt Lớp', label: 'Isometric 3D Cắt Lớp 45°' },
            { value: 'Top-Down 3D View', label: 'Top-down 3D Nhìn Thẳng' },
            { value: 'Perspective Phối Cảnh', label: 'Phối Cảnh Góc Rộng' },
          ],
        },
        {
          key: 'flooring',
          label: 'Vật liệu sàn chính',
          defaultValue: 'Sàn gỗ sồi tự nhiên',
          options: [
            { value: 'Sàn gỗ sồi tự nhiên', label: 'Gỗ sồi tự nhiên' },
            { value: 'Đá vân mây Calacatta', label: 'Đá vân mây Calacatta' },
            { value: 'Bê tông mài Terrazzo', label: 'Bê tông mài Terrazzo' },
            { value: 'Gỗ óc chó Walnut', label: 'Gỗ óc chó sang trọng' },
          ],
        },
        {
          key: 'wallStyle',
          label: 'Kiểu & chiều cao tường',
          defaultValue: 'Tường cắt lửng 1.2m',
          options: [
            { value: 'Tường cắt lửng 1.2m', label: 'Tường cắt lửng 1.2m' },
            { value: 'Tường cắt sạch tối giản', label: 'Tường cắt sạch tối giản' },
            { value: 'Tường kính trong suốt', label: 'Tường kính phân vùng' },
          ],
        },
        {
          key: 'lighting',
          label: 'Ánh sáng',
          defaultValue: 'Ban ngày tự nhiên',
          options: [
            { value: 'Ban ngày tự nhiên', label: 'Ban ngày tự nhiên' },
            { value: 'Đèn ấm 3000K', label: 'Đèn trần & LED ấm 3000K' },
            { value: 'Hoàng hôn rọi xiên', label: 'Hoàng hôn rọi cửa sổ' },
          ],
        },
        {
          key: 'furnitureDensity',
          label: 'Mật độ nội thất',
          defaultValue: 'Đầy đủ tiêu chuẩn',
          options: [
            { value: 'Đầy đủ tiêu chuẩn', label: 'Đầy đủ tiêu chuẩn' },
            { value: 'Tối giản gọn gàng', label: 'Tối giản gọn gàng' },
            { value: 'Chi tiết cao cấp', label: 'Chi tiết sang trọng' },
          ],
        },
        {
          key: 'palette',
          label: 'Tông màu chủ đạo',
          defaultValue: 'Ấm áp tự nhiên',
          options: [
            { value: 'Ấm áp tự nhiên', label: 'Ấm áp tự nhiên (Be / Gỗ)' },
            { value: 'Trung tính hiện đại', label: 'Trung tính (Xám / Trắng)' },
            { value: 'Tương phản trầm', label: 'Trầm ấm (Óc chó / Đá đen)' },
          ],
        },
      ]}
      resultPoolsByMode={{
        arch: [floorplanIsoImg, ARCH_ASSETS.floorPlan3D, modeInteriorImg, modeLandscapeImg],
        interior: [floorplanIsoImg, modeInteriorImg, ARCH_ASSETS.floorPlan3D, ARCH_ASSETS.heroInterior],
        urban: [modeUrbanImg, floorplanIsoImg, ARCH_ASSETS.landscapeUrban, ARCH_ASSETS.floorPlan3D],
        landscape: [modeLandscapeImg, floorplanIsoImg, ARCH_ASSETS.landscapeUrban, ARCH_ASSETS.floorPlan3D],
      }}
      comparatorBeforeLabel="3D AI"
      comparatorAfterLabel="2D GỐC"
      emptyHintText="Tải ảnh mặt bằng 2D ở Bước 1 hoặc chọn ảnh mẫu, tùy chỉnh vật liệu rồi bấm BẮT ĐẦU RENDER để dựng phối cảnh 3D."
      guideTitle="Hướng dẫn chuyển đổi Mặt Bằng 2D → 3D"
      guideSteps={[
        {
          title: 'Tải mặt bằng 2D',
          desc: 'Sử dụng bản vẽ CAD xuất ảnh rõ nét, PDF chụp màn hình hoặc bản vẽ phác có ký hiệu tường và cửa.',
        },
        {
          title: 'Chọn góc & vật liệu',
          desc: 'Thiết lập góc Isometric 45° hoặc Top-Down cùng vật liệu sàn, chiều cao tường và ánh sáng mong muốn.',
        },
        {
          title: 'So sánh 2D / 3D',
          desc: 'Kéo thanh trượt 3D AI / 2D GỐC trực tiếp để đối chiếu vị trí vách ngăn và đồ nội thất trước khi tải về.',
        },
      ]}
      downloadPrefix="ACHIPICS_FLOORPLAN_3D"
      zoomTitle="Bản Xem Mặt Bằng 3D Chi Tiết"
    />
  );
};
