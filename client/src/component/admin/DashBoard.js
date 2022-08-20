import React, { useEffect } from 'react';
import SlideBar from './slidebar/SlideBar';
import { Link } from 'react-router-dom';
import { getAdminHomes } from '../../redux/action/homeAction';
import { getAllUsers, clearErrors } from '../../redux/action/userAction';
import { getAllNews } from '../../redux/action/newsAction';
import Loading from '../utils/loader/Loading';

import { useDispatch, useSelector } from 'react-redux';

function DashBoard() {
	const { homes, loading: homeLoading } = useSelector(
		(state) => state.allHomes
	);
	const { users, loading, error } = useSelector((state) => state.users);
	const { news, loading: newsLoading } = useSelector(
		(state) => state.allNews
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			window.alert(error);
			dispatch(clearErrors());
		}
		dispatch(getAdminHomes());
		dispatch(getAllNews());
		dispatch(getAllUsers());
	}, [dispatch, error]);
	return (
		<>
			<div className='dashbord_page'>
				<SlideBar />
				{loading ? (
					<Loading />
				) : (
					<div className='dashboard_container'>
						<div className='dashboard_menu'>
							<div className='all_amount'>
								<h3>Dashboard Page </h3>
							</div>
							<div className='admin_count'>
								{homeLoading ? (
									<Loading />
								) : (
									<div>
										<Link to='/admin/homes'>
											<p>Post</p>
											<p>{homes && homes.length}</p>
										</Link>
									</div>
								)}
								<div>
									<Link to='/admin/users'>
										<p>users</p>
										<p>{users && users.length}</p>
									</Link>
								</div>
								{newsLoading ? (
									<Loading />
								) : (
									<div>
										<Link to='/admin/news'>
											<p>News</p>
											<p>{news && news.length}</p>
										</Link>
									</div>
								)}
							</div>
						</div>
						<div className='alluserProfile'>
							<div className='usersWrapper'>
								{users &&
									users.map((user) => (
										<div
											key={user._id}
											className='usersCard'>
											<img src={user.avatar.url} alt='' />
											<h3>{user.name}</h3>
											<p>{user.email}</p>
										</div>
									))}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default DashBoard;
