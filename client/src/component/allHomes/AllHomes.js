import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchHomes, clearErrors } from '../../redux/action/homeAction';
import Loading from '../utils/loader/Loading';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Search from './../Search';

function AllHomes() {
	const [searchKey, setSearchKey] = useState('');
	const [division, setDivision] = useState('');
	const [district, setDistrict] = useState('');
	const [upazila, setUpazila] = useState('');
	const [union, setUnion] = useState('');

	const { loading, error, homes, homesCount, resultPerpage, result } =
		useSelector((state) => state.homes);

	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([1, 30000]);
	const dispatch = useDispatch();

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};
	const priceHandler = (event, newPrice) => {
		setPrice(newPrice);
	};
	const count = result;

	useEffect(() => {
		if (error) {
			window.alert(error);
			dispatch(clearErrors());
		}
		dispatch(
			getSearchHomes(
				searchKey,
				division,
				district,
				upazila,
				union,
				price,
				currentPage
			)
		);
	}, [
		dispatch,
		error,
		searchKey,
		division,
		district,
		upazila,
		union,
		price,
		currentPage,
	]);

	return (
		<>
			<div className='all_homes'>
				<div className='container'>
					<div className='searchSection'>
						<div className='container'>
							<div className='search_card'>
								<div>
									<h2>বাসা খোঁজার সবচেয়ে সহজ উপায়</h2>
									<p>
										{homesCount} টি বিজ্ঞাপন থেকে আপনার
										পছন্দের বাসাটি এখনি খুঁজুন
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
								/>

								<div className='filter_price'>
									<Typography>Price :</Typography>
									<Slider
										value={price}
										onChange={priceHandler}
										valueLabelDisplay='auto'
										aria-labelledby='range-slider'
										min={0}
										max={30000}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='home_head_line'>
						<h3>আপনার কাঙ্খিত বাসা পছন্দ করুন</h3>
					</div>
					{loading ? (
						<Loading />
					) : (
						<>
							<div className='home_container'>
								{homes &&
									homes.map((item) => (
										<Link
											to={`/homeDetails/${item._id}`}
											id={
												item.stock === 'notAvailable' &&
												'borderRed'
											}
											className='home_card'
											key={item._id}>
											<p className='stockDiv'>
												{item.stock === 'notAvailable'
													? 'ভাড়া হয়েগেছে'
													: null}
											</p>
											{item.images && (
												<img
													src={item.images[0].url}
													alt=''
												/>
											)}
											<div>
												<p className='home_category'>
													{item.category}
												</p>
												<p className='home_address'>
													{item.address}
												</p>
												<p className='bedRoom'>
													{' '}
													বেড রুম : {item.BedRoom} টি
												</p>
												<div className='dateInline'>
													<p className='homesDate'>
														ভাড়া শুরু :{' '}
														{String(
															item.date
														).substr(0, 10)}
													</p>
													<p className='home_price'>
														ভাড়া : {item.price}
													</p>
												</div>
											</div>
										</Link>
									))}
							</div>
						</>
					)}
					<div className='paginationBox'>
						{resultPerpage >= count && (
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerpage}
								totalItemsCount={homesCount}
								onChange={setCurrentPageNo}
								nextPageText='Next'
								prevPageText='Prev'
								itemClass='page-item'
								linkClass='page-link'
								activeClass='pageItemActive'
								activeLinkClass='pageLinkActive'
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default AllHomes;
