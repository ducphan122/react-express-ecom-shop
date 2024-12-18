import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.less';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBolt, faBars } from '@fortawesome/free-solid-svg-icons';
// import { Anchor, Drawer, Button } from "antd";
import { Badge, Button, Dropdown, DropdownItem } from '@windmill/react-ui';
import { LogOut, ShoppingCart, User } from 'react-feather';
import { Transition } from '@windmill/react-ui';
import toast from 'react-hot-toast';

import apiAxios from '../../config/axiosConfig';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentUser,
  isLoggedInUpdated,
  currentUserUpdated,
  currentUserStatusUpdated,
  selectIsLoggedIn,
} from '../../features/users/usersSlice';
import {
  cartProductsUpdated,
  selectCart,
  removeProductFromCart,
  selectFetchCurrentCartStatus,
  fetchCurrentCart,
} from '../../features/cart/cartSlice';
import { customerOrdersUpdated } from '../../features/orders/ordersSlice';

function NavTailwind() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fetchStatus = useSelector(selectFetchCurrentCartStatus);
  const dispatch = useDispatch();

  // const makeCart = () => {
  //   if(fetchStatus === "succeeded") {
  //     setTimeout(
  //       // dispatch(fetchCurrentCart())
  //     , 3000);
  //     console.log("1");
  //   }

  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(fetchCurrentCart());
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [fetchStatus]);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const cart = useSelector(selectCart);

  // cart is object -> cart[keyname] return the key of property
  const nrCartItems = Object.keys(cart).reduce((accumulator, keyname) => accumulator + cart[keyname].quantity, 0);
  const handleLogout = async () => {
    try {
      await dispatch(isLoggedInUpdated(false));
      await dispatch(currentUserUpdated({})); //Clear current user info from session
      await dispatch(cartProductsUpdated({})); //Clear cart
      await dispatch(customerOrdersUpdated({}));
      await dispatch(currentUserStatusUpdated('idle'));
      await apiAxios.post('/auth/logout');
      toast.success('Log out successfully');
      // console.log(cart[11]);
    } catch (err) {
      console.log(err);
    }
  };

  const click = async () => {
    console.log(cart);
  };

  return (
    <nav className="flex items-center justify-between px-2 lg:px-36 py-2 shadow-lg fixed w-full bg-white top-0 z-10">
      <Link to="/" className="text-gray-700 text-2xl font-bold dark:text-gray-400">
        <div className="logo">
          <FontAwesomeIcon className="fas fa-bolt" icon={faBolt} style={{ color: '#1DA57A' }} />
          <span> Bolt</span>
        </div>
      </Link>

      <ul className="flex space-x-4">
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/cart">
                <Button layout="link">
                  <span className="lg:block hidden">Cart</span>
                  <ShoppingCart className="lg:hidden" />
                  <Badge className="ml-2" type="danger">
                    {nrCartItems}
                  </Badge>{' '}
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <Button layout="link">
                  <span>Login</span>
                </Button>
              </Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/cart">
                <Button layout="link">
                  <span className="lg:block hidden">Cart</span>
                  {/* <ShoppingCart className="lg:hidden" /> */}
                  <ShoppingCart />
                  <Badge className="ml-2" type="danger">
                    {nrCartItems}
                  </Badge>{' '}
                </Button>
              </Link>
            </li>
            <li className="relative">
              <Button layout="link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className="lg:block hidden">Account</span>
                {/* <User className="lg:hidden" /> */}
                <User />
              </Button>
              <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-150 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dropdown
                  align="right"
                  isOpen={isDropdownOpen}
                  onClose={() => {
                    setIsDropdownOpen(false);
                  }}
                  className="z-10"
                >
                  <DropdownItem className="cursor-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                    <p className="self-start">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="self-start">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <Link className="w-full" to="/account">
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <Link className="w-full" to="/orders">
                      Orders
                    </Link>
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <Link className="w-full" to="/admin">
                      Admin
                    </Link>
                  </DropdownItem>
                  <DropdownItem tag="a" className="border-t">
                    <Link className="w-full" onClick={() => handleLogout()} to="/login">
                      <Button iconRight={LogOut} block>
                        Logout
                      </Button>
                    </Link>
                  </DropdownItem>
                </Dropdown>
              </Transition>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavTailwind;
