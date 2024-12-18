import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductCard_antd from './ProductCard_antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, selectFetchAllProductsStatus } from '../../features/products/productsSlice';
// import { needsCheckoutRedirectUpdated } from '../../features/cart/cartSlice'
import ReactPaginate from 'react-paginate';
import './Pagination.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Layout, Row, Divider } from 'antd';
import LayoutHelmet from '../../layout/LayoutHelmet';

import { useHistory, useParams } from 'react-router-dom';

const ProductList = () => {
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectFetchAllProductsStatus);

  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const { productOffset = 0 } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(needsCheckoutRedirectUpdated(false))
  //   }, [dispatch])

  useEffect(() => {
    const slice = Object.keys(products).slice(productOffset, productOffset + perPage);
    const postData = slice.map(keyName => <ProductCard_antd key={products[keyName].id} product={products[keyName]} />);
    setData(postData);
    setPageCount(Math.ceil(Object.keys(products).length / perPage));
  }, [products, productOffset, perPage]);

  const handlePageClick = e => {
    const selectedPage = e.selected;
    window.scrollTo(0, 0);
    history.push(`/${Math.ceil(selectedPage * perPage)}`);
  };

  return (
    <LayoutHelmet loading={productsStatus !== 'succeeded'}>
      {productsStatus === 'loading' && <FontAwesomeIcon className="mt-20 mx-auto" icon={faCircleNotch} size="4x" spin />}

      {productsStatus === 'failed' && (
        <div className="p-4 mt-20 mx-auto max-w-screen-2xl">
          <h2 className="text-lg text-center">Problem connecting with the server. Please try to refresh the page.</h2>
        </div>
      )}

      {productsStatus === 'succeeded' && (
        <>
          <Row justify="center" gutter={[40, 24]}>
            {data}
          </Row>

          <div className="p-4 flex justify-center mx-auto">
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </>
      )}
    </LayoutHelmet>
  );
};

export default ProductList;
