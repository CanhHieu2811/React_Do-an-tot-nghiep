// import { lazy } from 'react';
// // import { Navigate } from "react-router-dom";

// import { PATH, PAGELAYOUT } from './constant';

// const IndexPages = lazy(() => import('src/pages/trang-chu'));
// const LoginPages = lazy(() => import('src/pages/dang-nhap'));
// const RegisterPages = lazy(() => import('src/pages/dang-ky'));
// const DashboardAdminPages = lazy(() => import('src/pages/admin/dashboard'));
// // const BlogPages = lazy(() => import('src/pages/blog'));
// const DanhSachNhanSuPages = lazy(() => import('src/pages/nguoi-dung-cuoi/nhan-su'));
// const UnitPages = lazy(() => import('src/pages/admin/danh-muc/don-vi'));
// const CompanyPages = lazy(() => import('src/pages/admin/cau-hinh-chung/thong-tin-website'));
// const DepartmentPages = lazy(() => import('src/pages/admin/danh-muc/phong-ban'));
// const TeamPages = lazy(() => import('src/pages/admin/danh-muc/bo-phan'));
// const ChucVuPages = lazy(() => import('src/pages/admin/danh-muc/chuc-vu'));
// const DanTocPages = lazy(() => import('src/pages/admin/danh-muc/dan-toc'));
// const HLATVSLDPages = lazy(() => import('src/pages/admin/danh-muc/hlatvslđ'));
// const TonGiaoPages = lazy(() => import('src/pages/admin/danh-muc/ton-giao'));
// const TrinhDoGDPTPages = lazy(() => import('src/pages/admin/danh-muc/trinh-do-gdpt'));
// const ContractTypePages = lazy(() => import('src/pages/admin/danh-muc/loai-hop-dong'));
// const LoaiLaoDongPages = lazy(() => import('src/pages/admin/danh-muc/loai-lao-dong'));
// const NganHangPages = lazy(() => import('src/pages/admin/danh-muc/ngan-hang'));
// const TinhTPPages = lazy(() => import('src/pages/admin/danh-muc/tinh-tp'));
// const QuanHuyenPages = lazy(() => import('src/pages/admin/danh-muc/quan-huyen'));
// const PhuongXaPages = lazy(() => import('src/pages/admin/danh-muc/phuong-xa'));
// const LyLuanChinhTriPages = lazy(() => import('src/pages/admin/danh-muc/ly-luan-chinh-tri'));
// const TrinhDoNgoaiNguPages = lazy(() => import('src/pages/admin/danh-muc/trinh-do-ngoai-ngu'));
// const TrinhDoTinHocPages = lazy(() => import('src/pages/admin/danh-muc/trinh-do-tin-hoc'));
// const NhomMauPages = lazy(() => import('src/pages/admin/danh-muc/nhom-mau'));
// const TrinhDoChuyenMonPages = lazy(() => import('src/pages/admin/danh-muc/trinh-do-chuyen-mon'));
// const DoiTuongChinhSachPages = lazy(() => import('src/pages/admin/danh-muc/doi-tuong-chinh-sach'));
// const DanhHieuPhongTangPages = lazy(() => import('src/pages/admin/danh-muc/danh-hieu'));
// const HinhThucDaoTaoPages = lazy(() => import('src/pages/admin/danh-muc/hinh-thuc-dao-tao'));

// const LoaiNgayNghiPages = lazy(() => import('src/pages/admin/danh-muc/loai-ngay-nghi'));
// // const CategoryTypePages = lazy(() => import('src/pages/admin/categoryType'));
// const WorkTimePages = lazy(() => import('src/pages/admin/danh-muc/thoi-gian-lam-viec'));
// const WorkTypePages = lazy(() => import('src/pages/admin/cham-cong/loai-cong'));

// const AttributePages = lazy(() => import('src/pages/admin/hrm/thuoc-tinh'));
// // const LogPages = lazy(() => import('src/pages/admin/logs'));
// // const FormDynamicPages = lazy(() => import('src/pages/admin/form-dynamic'));
// const SettingPages = lazy(() => import('src/pages/admin/cau-hinh-chung/cau-hinh-he-thong'));

// // const ProductsPages = lazy(() => import('src/pages/products'));
// const Page404 = lazy(() => import('src/pages/khong-tim-thay'));

// const ChamCongThangPages = lazy(
//   () => import('src/pages/nguoi-dung-cuoi/cham-cong/cham-cong-thang')
// );

// export const routerData = [
//   {
//     parent: PAGELAYOUT.DASHBOARD,
//     pathName: PATH.DASHBOARD,
//     component: IndexPages,
//     helmetTitle: 'helmet.default',
//     dashboard: true,
//   },
//   {
//     parent: null,
//     pathName: PATH.LOGIN,
//     component: LoginPages,
//     helmetTitle: 'helmet.login_pages',
//   },
//   {
//     parent: null,
//     pathName: PATH.REGISTER,
//     component: RegisterPages,
//     helmetTitle: 'helmet.register_pages',
//   },

//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN,
//     component: DashboardAdminPages,
//     helmetTitle: 'helmet.administration_pages',
//     dashboard: true,
//     title: 'dashboard',
//     icon: 'ic_analytics',
//   },

//   // CATEGORY
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.COMPANY,
//     component: CompanyPages,
//     helmetTitle: 'helmet.company_pages',
//     title: 'company',
//     icon: 'ic_company',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.SETTING,
//     component: SettingPages,
//     helmetTitle: 'helmet.setting_pages',
//     title: 'setting',
//     icon: 'ic_setting',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.UNIT,
//     component: UnitPages,
//     helmetTitle: 'helmet.unit_pages',
//     title: 'unit',
//     icon: 'ic_unit',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.DEPARTMENT,
//     component: DepartmentPages,
//     helmetTitle: 'helmet.department_pages',
//     title: 'department',
//     icon: 'ic_department',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TEAM,
//     component: TeamPages,
//     helmetTitle: 'helmet.team_pages',
//     title: 'team',
//     icon: 'ic_team',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   // {
//   //   parent: PAGELAYOUT.ADMIN,
//   //   pathName: PATH.ADMIN + PATH.CATEGORY_TYPE,
//   //   component: CategoryTypePages,
//   //   helmetTitle: 'helmet.category_type_pages',
//   //   title: 'category_type',
//   //   icon: 'ic_category_type',
//   //   parentRouter: 'category',
//   //   iconParent: 'ic_user',
//   // },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.CHUC_VU,
//     component: ChucVuPages,
//     helmetTitle: 'helmet.chuc_vu_pages',
//     title: 'chuc_vu',
//     icon: 'ic_chuc_vu',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.DAN_TOC,
//     component: DanTocPages,
//     helmetTitle: 'helmet.dan_toc_pages',
//     title: 'dan_toc',
//     icon: 'ic_dan_toc',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.HLATVSLD,
//     component: HLATVSLDPages,
//     helmetTitle: 'helmet.hlatvsld_pages',
//     title: 'hlatvsld',
//     icon: 'ic_hlatvsld',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TON_GIAO,
//     component: TonGiaoPages,
//     helmetTitle: 'helmet.ton_giao_pages',
//     title: 'ton_giao',
//     icon: 'ic_ton_giao',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TRINH_DO_GDPT,
//     component: TrinhDoGDPTPages,
//     helmetTitle: 'helmet.trinh_do_gdpt_pages',
//     title: 'trinh_do_gdpt',
//     icon: 'ic_trinh_do_gdpt',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.CONTRACT_TYPE,
//     component: ContractTypePages,
//     helmetTitle: 'helmet.contract_type_pages',
//     title: 'contract_type',
//     icon: 'ic_contract_type',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.LOAI_LAO_DONG,
//     component: LoaiLaoDongPages,
//     helmetTitle: 'helmet.loai_lao_dong_pages',
//     title: 'loai_lao_dong',
//     icon: 'ic_loai_lao_dong',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.NGAN_HANG,
//     component: NganHangPages,
//     helmetTitle: 'helmet.ngan_hang_pages',
//     title: 'ngan_hang',
//     icon: 'ic_ngan_hang',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TINH_TP,
//     component: TinhTPPages,
//     helmetTitle: 'helmet.tinh_tp_pages',
//     title: 'tinh_tp',
//     icon: 'ic_tinh_tp',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.QUAN_HUYEN,
//     component: QuanHuyenPages,
//     helmetTitle: 'helmet.quan_huyen_pages',
//     title: 'quan_huyen',
//     icon: 'ic_quan_huyen',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.PHUONG_XA,
//     component: PhuongXaPages,
//     helmetTitle: 'helmet.phuong_xa_pages',
//     title: 'phuong_xa',
//     icon: 'ic_phuong_xa',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.WORK_TIME,
//     component: WorkTimePages,
//     helmetTitle: 'helmet.work_time_pages',
//     title: 'work_time',
//     icon: 'ic_work_time',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.LOAI_NGAY_NGHI,
//     component: LoaiNgayNghiPages,
//     helmetTitle: 'helmet.loai_ngay_nghi_pages',
//     title: 'loai_ngay_nghi',
//     icon: 'ic_day_off',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.LY_LUAN_CHINH_TRI,
//     component: LyLuanChinhTriPages,
//     helmetTitle: 'helmet.ly_luan_chinh_tri_pages',
//     title: 'ly_luan_chinh_tri',
//     icon: 'ic_ly_luan_chinh_tri',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TRINH_DO_NGOAI_NGU,
//     component: TrinhDoNgoaiNguPages,
//     helmetTitle: 'helmet.trinh_do_ngoai_ngu_pages',
//     title: 'trinh_do_ngoai_ngu',
//     icon: 'ic_trinh_do_ngoai_ngu',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TRINH_DO_TIN_HOC,
//     component: TrinhDoTinHocPages,
//     helmetTitle: 'helmet.trinh_do_tin_hoc_pages',
//     title: 'trinh_do_tin_hoc',
//     icon: 'ic_trinh_do_tin_hoc',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.WORK_TYPE,
//     component: WorkTypePages,
//     helmetTitle: 'helmet.work_type_pages',
//     title: 'work_type',
//     icon: 'ic_work_type',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.NHOM_MAU,
//     component: NhomMauPages,
//     helmetTitle: 'helmet.nhom_mau_pages',
//     title: 'nhom_mau',
//     icon: 'ic_nhom_mau',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.TRINH_DO_CHUYEN_MON,
//     component: TrinhDoChuyenMonPages,
//     helmetTitle: 'helmet.trinh_do_chuyen_mon_pages',
//     title: 'trinh_do_chuyen_mon',
//     icon: 'ic_trinh_do_chuyen_mon',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.DANH_HIEU,
//     component: DanhHieuPhongTangPages,
//     helmetTitle: 'helmet.danh_hieu_pages',
//     title: 'danh_hieu',
//     icon: 'ic_danh_hieu',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.DOI_TUONG_CHINH_SACH,
//     component: DoiTuongChinhSachPages,
//     helmetTitle: 'helmet.doi_tuong_chinh_sach_pages',
//     title: 'doi_tuong_chinh_sach',
//     icon: 'ic_doi_tuong_chinh_sach',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.HINH_THUC_DAO_TAO,
//     component: HinhThucDaoTaoPages,
//     helmetTitle: 'helmet.hinh_thuc_dao_tao_pages',
//     title: 'hinh_thuc_dao_tao',
//     icon: 'ic_hinh_thuc_dao_tao',
//     parentRouter: 'category',
//     iconParent: 'ic_user',
//   },
//   // HRM
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.USERS_INFO,
//     component: DanhSachNhanSuPages,
//     helmetTitle: 'helmet.user_pages',
//     title: 'user',
//     icon: 'ic_user',
//     // parentRouter: 'hrm',
//     // iconParent: 'ic_user',
//   },
//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.ATTRIBUTE,
//     component: AttributePages,
//     helmetTitle: 'helmet.attribute_pages',
//     title: 'attribute',
//     icon: 'ic_attribute',
//     // parentRouter: 'hrm',
//     // iconParent: 'ic_user',
//   },

//   // {
//   //   parent: PAGELAYOUT.ADMIN,
//   //   pathName: PATH.ADMIN + PATH.DYNAMIC,
//   //   component: FormDynamicPages,
//   //   helmetTitle: 'helmet.attribute_pages',
//   //   title: 'dynamic',
//   //   icon: 'ic_attribute',
//   //   // parentRouter: 'hrm',
//   //   // iconParent: 'ic_user',
//   // },

//   // {
//   //   parent: PAGELAYOUT.ADMIN,
//   //   pathName: PATH.ADMIN + PATH.ATTRIBUTE,
//   //   component: AttributePages,
//   //   helmetTitle: 'helmet.attribute_pages',
//   //   title: 'attribute',
//   //   icon: 'ic_attribute',
//   //   // parentRouter: 'hrm',
//   //   // iconParent: 'ic_user',
//   // },
//   // {
//   //   parent: PAGELAYOUT.ADMIN,
//   //   pathName: PATH.ADMIN + PATH.LOG,
//   //   component: LogPages,
//   //   helmetTitle: 'helmet.log_pages',
//   //   title: 'log',
//   //   icon: 'ic_log',
//   //   // parentRouter: 'hrm',
//   //   // iconParent: 'ic_user',
//   // },
//   {
//     parent: null,
//     pathName: PATH.NOTFOUND,
//     component: Page404,
//     helmetTitle: 'helmet.not_found_pages',
//   },
//   {
//     parent: null,
//     pathName: PATH.ALL,
//     component: Page404,
//     helmetTitle: 'helmet.not_found_pages',
//   },

//   {
//     parent: PAGELAYOUT.ADMIN,
//     pathName: PATH.ADMIN + PATH.MONTH_TIMEKEEP,
//     component: ChamCongThangPages,
//     helmetTitle: 'helmet.month_timekeep',
//     title: 'month_timekeep',
//     icon: 'ic_timeKeep',
//     // parentRouter: 'timekeep',
//     // iconParent: 'ic_timeKeep',
//   },
// ];
