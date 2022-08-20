import React, { useState } from 'react';
import Category from './Category';
import Search from '../Search';
import Carousel from 'react-material-ui-carousel';
import { getSubAdminUsers, clearErrors } from '../../redux/action/userAction';
import { getBanner, getAddsBanner } from '../../redux/action/homeAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utils/loader/Loading';
import News from './news/News';
import OwnerProfile from './OwnerProfile';
import { getAllhomes } from '../../redux/action/homeAction';

function Home() {
	const [searchKey, setSearchKey] = useState('');
	const [division, setDivision] = useState('');
	const [district, setDistrict] = useState('');
	const [upazila, setUpazila] = useState('');
	const [union, setUnion] = useState('');

	const onSearch = () => {
		console.log({
			searchKey,
			division,
			district,
			upazila,
			union,
		});
	};

	const { users, error, loading } = useSelector((state) => state.users);
	const {
		error: bannerError,
		banner,
		adds,
	} = useSelector((state) => state.getAdds);
	const { homesCount } = useSelector((state) => state.homes);

	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			window.alert(error);
			dispatch(clearErrors());
		}
		if (bannerError) {
			window.alert(error);
			dispatch(clearErrors());
		}
		dispatch(getSubAdminUsers());
		dispatch(getBanner());
		dispatch(getAddsBanner());
		dispatch(getAllhomes());
	}, [error, dispatch, bannerError]);

	return (
		<div className='home'>
			<div className='container'>
				<div className='banner_card'>
					<Carousel interval={2000} animation='slide'>
						{banner &&
							banner.map((item) => (
								<img
									src={item.banner.url}
									key={item._id}
									alt=''
								/>
							))}
					</Carousel>
				</div>
			</div>
			<div className='searchSection'>
				<div className='container'>
					<div className='search_card'>
						<div>
							<h2>বাসা খোঁজার সবচেয়ে সহজ উপায়</h2>
							<p>
								{homesCount} টি বিজ্ঞাপন থেকে আপনার পছন্দের
								বাসাটি এখনি খুঁজুন
							</p>
						</div>

						<Search
							searchKey={searchKey}
							division={division}
							district={district}
							upazila={upazila}
							union={union}
							setSearchKey={setSearchKey}
							setDivision={setDivision}
							setDistrict={setDistrict}
							setUpazila={setUpazila}
							setUnion={setUnion}
							onSearch={onSearch}
						/>
					</div>
				</div>
			</div>
			<Category />
			{loading ? <Loading /> : <OwnerProfile users={users} />}

			<News />
			<div className='container'>
				<div className='banner_card' id='addsCard'>
					<Carousel interval={2000} animation='slide'>
						{adds &&
							adds.map((item) => (
								<img
									src={item.adds.url}
									key={item._id}
									alt=''
								/>
							))}
					</Carousel>
				</div>
			</div>
		</div>
	);
}

export default Home;
