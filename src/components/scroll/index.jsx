import PropTypes from 'prop-types';
// import { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { Box, CircularProgress } from '@mui/material';
// import LoadingComponent from '../loading';

// import { setFetchData } from 'src/redux/common';

export default function InfiniteScrollComponent({ data, total, setConditions, children }) {
  // const dispatch = useDispatch()
  // const fetch = useSelector((state) => state.common.fetchData);
  return (
    // <LoadingComponent>
    <InfiniteScroll
      dataLength={data.length}
      next={() => setConditions((old) => ({ ...old, pageSize: Number(old.pageSize) + 10 }))}
      hasMore={data.length !== total}
      // you can create a spinner component which will be
      // displayed when the Items are being loaded
      loader={data.length > total}
    >
      {children}
    </InfiniteScroll>
    // </LoadingComponent>
  );
}
// const handleScroll = useCallback(() => {
//   if (
//     window.innerHeight + document.documentElement.scrollTop ===
//     document.documentElement.offsetHeight
//   ) {
//     // fetchData(page);
//     setPage(page + 1);
//   }
// }, [page, setPage]);

// useEffect(() => {
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, [handleScroll]);
// useEffect(() => {
//   if (hasMore) {
//     setPage(page + 1);
//   }
// }, [hasMore, page, setPage]);
// const handleScroll = useCallback(() => {
//   // console.log(444, window.innerHeight , document.documentElement.scrollTop ,document.documentElement.offsetHeight)
//   if ( document.documentElement.scrollTop < document.documentElement.offsetHeight) {
//     return;
//   }
//   // fetchData(page + 1);
//   setConditions((old) => ({
//     ...old,
//     pageIndex: Number(old.pageIndex) + 1
//   }))
// }, [setConditions])

// useEffect(() => {
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, [handleScroll]);

//    (
//     <InfiniteScroll
//           dataLength={rows?.length}
//           next={() => setConditions((old) => ({...old, pageSize: Number(old.pageSize) + 20}))}
//           hasMore
//           loader={<h4>Loading...</h4>}
//         >
//           {renderData}
//         </InfiniteScroll>
//   )
// ;
// export default InfiniteScroll;

InfiniteScrollComponent.propTypes = {
  data: PropTypes.any,
  setConditions: PropTypes.any,
  children: PropTypes.any,
  total: PropTypes.any,
};
