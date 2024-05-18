import { PATH } from 'src/routes/constant';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { NAV } from 'src/utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// import { setPopup } from 'src/redux/common';
import { useNavigate } from 'react-router-dom';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

import clsx from 'clsx';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Root,
  TreeItem2GroupTransition,
} from '@mui/x-tree-view/TreeItem2';
import { unstable_useTreeItem2 as useTreeItem } from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { forwardRef, useEffect, useState } from 'react';
import SvgColor from 'src/components/svg-color';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'src/routes/hooks';
import { setConfirmDialog, setPopup } from 'src/redux/common';
import { setLinkPrev } from 'src/redux/auth';
import { Link } from '@mui/material';
import { RouterLink } from 'src/routes/components';


const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 1),
  fontWeight: theme.typography.fontWeightMedium,
  '&.expanded': {
    fontWeight: theme.typography.inherit,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  // '& .children.selected.focused': {
  //   backgroundColor: `var(--tree-view-bg-color, ${theme.palette.primary.main})`,
  //   color: theme.palette.common.white,
  // },
}));

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(({ theme }) => ({
  marginLeft: 0,
  [`& .content`]: {
    paddingLeft: theme.spacing(0.5),
  },
}));

const CustomTreeItem = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const equalForm = useSelector((state) => state.common.equalForm);
  const { t } = useTranslation();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    icon,
    path,
    // bgColor,
    // color,
    labelInfo,
    className,
    // colorForDarkMode,
    // bgColorForDarkMode,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });
  const pathname = usePathname();
  const active =
    path === pathname ||
    (children && Array.isArray(children) && children.some((item) => item.props.path === pathname));

  const handleActive = (pathName) => {
    dispatch(setLinkPrev(path));
    if (path) {
      if (equalForm) {
        navigate(pathName);
        dispatch(setPopup(false));
      } else {
        dispatch(
          setConfirmDialog({
            show: true,
            url: null,
            content: t('dialog.change_form'),
          })
        );
      }
    }
  };
  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
          })}
          sx={{
            ...(active && {
              color: 'primary.main',
              fontWeight: 'fontWeightSemiBold',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }),
          }}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 0.5,
              pr: 0,
            }}
            onClick={(e) => handleActive(path)}
          >
            <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
              <SvgColor src={`/assets/icons/navbar/${icon}.svg`} sx={{ width: 1, height: 1 }} />
            </Box>
            {className === 'parent' ? (
              <Typography
                {...getLabelProps({
                  variant: 'body2',
                  sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 },
                })}
              />
            ) : (
              <Link
                component={RouterLink}
                href={path}
                {...getLabelProps({
                  variant: 'body2',
                  sx: {
                    display: 'flex',
                    fontWeight: 'inherit',
                    flexGrow: 1,
                    ...(active && { color: 'primary.main' }),
                  },
                })}
              />
            )}

            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </CustomTreeItemContent>
        {children && <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});

const routers = [
  // {
  //   title: 'nav.dashboard',
  //   icon: 'ic_list',
  //   path: PATH.ADMIN,
  // },
  {
    title: 'nav.nguoi_dung',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.USERS,
  },
  {
    title: 'nav.tram',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.STATION,
  },
  {
    title: 'nav.xe',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.BICYCLE,
  },
  {
    title: 'nav.thong_tin_thue_xe',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.INFO_CAR,
  },
  {
    title: 'nav.thanh_toan',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.PAY,
  },
  {
    title: 'nav.banner',
    icon: 'ic_list',
    children: [
      {
        title: 'nav.banner_web',
        icon: 'ic_list',
        path: PATH.ADMIN + PATH.BANNER_WEB,
      },
      {
        title: 'nav.banner_mobile',
        icon: 'ic_list',
        path: PATH.ADMIN + PATH.BANNER_MOBILE,
      },
    ],
  },
  {
    title: 'nav.xe_gia_thue',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.CAR_PRICE,
  },
  {
    title: 'nav.tin-tuc-su-kien',
    icon: 'ic_list',
    path: PATH.ADMIN + PATH.NEWS,
  },
];

export default function SideBar(props) {
  const { openNav, onCloseNav, code } = props;
  const upLg = useResponsive('up', 'lg');
  const { t } = useTranslation();
  const showNav = useSelector((state) => state.common.showNav);
  const [router, setRouter] = useState(routers);
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');
  useEffect(() => {
    if (code === 'cham-cong') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setRouter([
        // {
        //   path: PATH.ADMIN + PATH.MONTH_TIMEKEEP,
        //   title: 'nav.month_timekeep',
        //   icon: 'ic_timeKeep',
        // },
        {
          path: PATH.TIMEKEEP_LIST,
          title: 'nav.timekeep_list',
          icon: 'ic_timeKeep',
        },
      ]);
    }
  }, [code]);

  useEffect(() => {
    router.forEach((el) => {
      if (el.children && el.children.length) {
        el.children.forEach((item) => {
          if (item.path === pathname) {
            setActiveMenu(el.title);
          }
        });
      } else setActiveMenu(el.title);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onItemExpansionToggle = (e, itemId, isExpanded) => {
    if (!isExpanded) setActiveMenu('');
    else setActiveMenu(itemId);
  };

  const renderMenu = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <SimpleTreeView
        aria-label="icon expansion"
        sx={{ position: 'relative', maxHeight: window.innerHeight - 85, overflow: 'auto' }}
        onItemExpansionToggle={onItemExpansionToggle}
        expandedItems={[activeMenu]}
      >
        {router.map((item, i) => {
          if (item.children && item.children.length) {
            return (
              <CustomTreeItem
                key={i}
                icon={item.icon}
                itemId={item.title}
                label={t(`${item.title}`)}
                className="parent"
              >
                {item.children.map((el, index) => {
                  if (el.children && el.children.length) {
                    return (
                      <CustomTreeItem
                        key={i}
                        icon={el.icon}
                        itemId={el.title}
                        label={t(`${el.title}`)}
                        className="parent"
                      >
                        {el.children.map((elm, inx) => (
                          <CustomTreeItem
                            key={inx}
                            icon={elm.icon}
                            itemId={elm.title}
                            label={t(`${elm.title}`)}
                            path={elm.path}
                            className="children"
                          />
                        ))}
                      </CustomTreeItem>
                    );
                  }
                  return (
                    <CustomTreeItem
                      key={index}
                      icon={el.icon}
                      itemId={el.title}
                      label={t(`${el.title}`)}
                      path={el.path}
                      className="children"
                    />
                  );
                })}
              </CustomTreeItem>
            );
          }
          return (
            <CustomTreeItem
              key={i}
              icon={item.icon}
              itemId={item.title}
              label={t(`${item.title}`)}
              path={item.path}
              className="children"
            />
          );
        })}
      </SimpleTreeView>
    </Scrollbar>
  );

  const renderContent = (
    <>
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <Logo sx={{ mt: 1, mb: 1, width: '100%' }} />
      </Box>

      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: showNav ? NAV.WIDTH : 0 },
        marginTop: 3,
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: showNav ? NAV.WIDTH : 0,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

SideBar.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  code: PropTypes.string,
};

CustomTreeItem.propTypes = {
  id: PropTypes.any,
  itemId: PropTypes.any,
  label: PropTypes.any,
  disabled: PropTypes.any,
  children: PropTypes.any,
  other: PropTypes.any,
  icon: PropTypes.any,
  path: PropTypes.any,
  bgColor: PropTypes.any,
  color: PropTypes.any,
  labelInfo: PropTypes.any,
  setActive: PropTypes.any,
  className: PropTypes.any,
};
