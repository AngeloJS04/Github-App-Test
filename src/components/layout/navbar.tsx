import { useDebounce } from '@/hooks/Debounce';
import { useLazySearchRepositoriesQuery, useLazySearchUsersQuery } from '@/redux/rtk/search';
import { setRepositories } from '@/redux/slices/repositories/repositories.slice';
import { SearchByEnum, setSearchBy } from '@/redux/slices/searchBy/searchBy.slice';
import { setUsers } from '@/redux/slices/users/users.slice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/router';


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from './navDropdown';


const Navbar = ({ offset }: { offset: number }) => {

  const [search, setSearch] = React.useState<string>('');
  const repositories = useSelector((state: RootState) => state.repositories)
  const users = useSelector((state: RootState) => state.users)
  const SearchBy = useSelector((state: RootState) => state.searchBy.searchBy)
  const dispatch = useDispatch();

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  // Debounce search term for efficient API calls
  const debouncedSearchTerm = useDebounce<string>(search, 2000)

  // Lazy query hooks for searching repositories and users
  const [trigger] = useLazySearchRepositoriesQuery()
  const [data] = useLazySearchUsersQuery()

  // Fetch data when debounced search term changes
  React.useEffect(() => {
    if (!debouncedSearchTerm) return;
    const fetchData = async () => {
      try {
        const [reposResult, usersResult] = await Promise.all([
          trigger({ data: debouncedSearchTerm, offset }).unwrap(),
          data({ data: debouncedSearchTerm, offset }).unwrap()
        ]);

        if (reposResult.items) {
          dispatch(setRepositories({
            items: [...repositories.items, ...reposResult.items],
            total_count: reposResult.total_count,
            incomplete_results: reposResult.incomplete_results
          }));
        }

        if (usersResult.items) {
          dispatch(setUsers({
            items: [...users.items, ...usersResult.items],
            total_count: usersResult.total_count,
            incomplete_results: usersResult.incomplete_results
          }));
        }
      } catch (err) { console.log(err) }
    };

    fetchData();
  }, [debouncedSearchTerm, offset]);

  // Handle search type selection
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSearchBy({ searchBy: value }));
  }

  return (
    <React.Fragment>
      <div className="navbar bg-base-200 px-3" >
        <Link className="flex-1" href={'/'}>
          <>
            <svg width="26" height="26" viewBox="0 0 18 18" fill="white">
              <path d="M7.23547 12.0586C6.83528 11.9984 6.46653 11.9496 6.1008 11.8855C5.38142 11.7589 4.68684 11.5612 4.03759 11.2467C2.94947 10.719 2.17025 9.93829 1.75374 8.88414C1.26469 7.64535 1.11718 6.37369 1.44725 5.0812C1.62135 4.39907 1.98768 3.79529 2.50394 3.2726C2.60368 3.17124 2.61638 3.09125 2.56923 2.96578C2.21135 2.01025 2.33407 1.07116 2.70101 0.140833C2.76207 -0.0131259 2.90413 -0.00983853 3.01475 0.00933779C3.49232 0.0931657 3.99044 0.142476 4.43355 0.309036C5.04834 0.5397 5.619 0.866793 6.21263 1.14567C6.29726 1.18512 6.41272 1.21854 6.49917 1.19937C8.57084 0.730915 10.6425 0.723793 12.713 1.19389C12.8707 1.2295 12.9808 1.20265 13.1083 1.12759C13.8621 0.683249 14.6462 0.2926 15.5288 0.101932C15.7899 0.0454989 16.0638 0.034541 16.3328 0.013721C16.4561 0.00440674 16.5293 0.0641273 16.5746 0.180829C16.9349 1.10732 17.0244 2.04038 16.7076 2.99317C16.6846 3.06166 16.7022 3.17398 16.7517 3.22548C17.7183 4.22977 18.0732 5.40884 17.9861 6.71776C17.9323 7.52536 17.7999 8.31871 17.4469 9.06988C16.8176 10.4062 15.6799 11.2253 14.1771 11.6318C13.5248 11.8083 12.8411 11.8888 12.1719 12.0126C12.1381 12.0192 12.1036 12.0241 12.0492 12.0334C12.1713 12.1775 12.2898 12.2986 12.3859 12.4334C12.7359 12.9238 12.8768 13.4739 12.8816 14.0486C12.8913 15.1011 12.8889 16.1536 12.8744 17.2056C12.8695 17.5442 12.9227 17.8203 13.3441 17.9387C10.8553 17.9595 8.36651 17.9803 5.82514 18.0011C6.34018 17.8126 6.40728 17.725 6.40305 17.2664C6.39822 16.7196 6.38975 16.1728 6.38129 15.6265C6.38069 15.5734 6.37222 15.5202 6.3692 15.4907C5.86927 15.5208 5.38203 15.5849 4.8966 15.5723C3.75528 15.5433 2.79955 15.1625 2.17387 14.2502C2.05962 14.0837 1.98345 13.8952 1.89338 13.7155C1.56694 13.0629 1.13532 12.4909 0.438921 12.1118C0.311973 12.0428 0.197115 11.9469 0.0973704 11.8466C-0.0682664 11.6806 -0.0223233 11.5239 0.221296 11.496C0.469146 11.4675 0.735737 11.4614 0.976333 11.5129C1.72351 11.6724 2.24279 12.1184 2.64056 12.692C3.0081 13.2224 3.47418 13.6426 4.15487 13.8262C4.89842 14.0267 5.61477 13.9122 6.31358 13.653C6.35953 13.636 6.41212 13.5834 6.41937 13.5412C6.5161 12.978 6.76697 12.4855 7.23547 12.0586Z" fill="#F9AF20" />
            </svg>
            <span className="cursor-pointer normal-case hidden md:flex text-xl px-2"  >Github Pro</span>
          </>
        </Link>
        <div className="flex">
          <select className="select select-sm select-bordered w-full max-w-xs mr-2" onChange={handleSelect} name="type" defaultValue="Repositories" >
            <option value="repositories">Repositories</option>
            <option value="users">Users</option>
          </select>
          <div className="form-control pr-4 flex">
            <input type="text" onChange={handleSearch} placeholder={SearchBy === SearchByEnum.repositories ? 'Search repositories' : 'Search users'} autoComplete="off" name='search' className="input input-sm input-bordered w-32 md:w-80" />
          </div>
          <NavDropdown />
        </div>
      </div>
    </React.Fragment>
  )
}
export default Navbar