import { Container, Toolbar } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import HeaderTrangChu from 'src/template/trang-chu/header';

export default function DanhSachTramXeTemplates() {
  return (
    <Container>
      <Toolbar id="back-to-top-anchor" sx={{ position: 'absolute' }} />
      {/* MENU */}
      <HeaderTrangChu />
      {/* MENU */}
      content trạm xe
    </Container>
  );
}
