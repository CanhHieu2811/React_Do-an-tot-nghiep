import { Container, Toolbar } from '@mui/material';
import Header from './header';
import Banner from './banner';
import ToiUuNoiBat from './toi-uu-noi-bat';
import CacBuocTienHanh from './cac-buoc-tien-hanh';
import KhieuNai from './khieu-nai';
import CauHoi from './cau-hoi';
import AppFooter from './app-footer';

export default function TrangChuTemplates() {
  return (
    <Container>
      <Toolbar id="back-to-top-anchor" sx={{ position: 'absolute' }} />
      {/* MENU */}
      <Header />
      {/* MENU */}

      {/* BANNER */}
      <Banner />
      {/* BANNER */}

      {/* ĐIỂM NỔI BẬT TỐI ƯU CỦA DỰ ÁN NÀY */}
      <ToiUuNoiBat />
      {/* ĐIỂM NỔI BẬT TỐI ƯU CỦA DỰ ÁN NÀY */}

      {/* CÁC BƯỚC TIẾN HÀNH */}
      <CacBuocTienHanh />
      {/* CÁC BƯỚC TIẾN HÀNH */}

      {/* Khiếu nại */}
      <KhieuNai />
      {/* Khiếu nại */}

      {/* Câu hỏi */}
      <CauHoi />
      {/* Câu hỏi */}

      {/* Footer */}
      <AppFooter />
      {/* Footer */}
    </Container>
  );
}
