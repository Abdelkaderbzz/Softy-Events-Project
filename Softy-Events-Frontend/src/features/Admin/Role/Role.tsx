import TableData from '../../../components/TableData/TableData';
import ListInfo from '../../../components/ListInfo/ListInfo';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/index';
import { useEffect } from 'react';
import { getRoles } from '../../../store/slices/role/roleThunk';
import Pagination from '../../../components/Pagination/Pagination';
import DrawerComp from '../../../components/Drawer/Drawer';

const Role = () => {
  const dispatch = useAppDispatch();
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.sitting
  );
  const { length, roles, status } = useSelector(
    (state: RootState) => state.role
  );


  useEffect(() => {
    dispatch(getRoles({ page: currentPage, pageSize: itemsPerPage}));
  }, [dispatch]);
  return (
    <div className="role-container">
      <div className="role-data">
        <ListInfo title={'Roles List'} itemsNumber={length} isUserListInfo={false} />
        <TableData
          data={roles}
          notIncluded={['description']}
          loading={status}
          isUserTable={false}
        />
      </div>
      <DrawerComp isRole={true} />
      <Pagination isUserTable={false} totalItems={length} itemsPerPage={5} />
    </div>
  )
};

export default Role;
