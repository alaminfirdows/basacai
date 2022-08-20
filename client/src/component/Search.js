import { FcSearch } from 'react-icons/fc';
import divisions from '../utils/area/divisions.json';
import districts from '../utils/area/districts.json';
import upazilas from '../utils/area/upazilas.json';
import unions from '../utils/area/unions.json';

const Search = ({
	searchKey,
	setSearchKey,
	division,
	setDivision,
	district,
	setDistrict,
	upazila,
	setUpazila,
	union,
	setUnion,
	onSearch,
}) => {
	const filteredDistricts = districts.filter(
		(district) => district.division_id === division
	);

	const filteredUpazilas = upazilas.filter(
		(upazila) => upazila.district_id === district
	);

	const filteredUnions = unions.filter(
		(union) => union.upazila_id === upazila
	);

	return (
		<div className='searchForm'>
			<div>
				<FcSearch />
				<input
					type='text'
					value={searchKey}
					onChange={(e) => {
						setSearchKey(e.target.value);
					}}
					placeholder='ফ্ল্যাট, সিট, সাবলেট'
				/>
			</div>

			{/* divisions */}
			<select
				defaultValue={division}
				onChange={(e) => {
					setDivision(e.target.value);
				}}>
				<option disabled value=''>
					বিভাগ
				</option>
				{divisions &&
					divisions.map((division) => (
						<option value={division.id} key={division.id}>
							{division.bn_name}
						</option>
					))}
			</select>

			{/* district */}
			<select
				defaultValue={district}
				onChange={(e) => {
					setDistrict(e.target.value);
				}}>
				<option disabled value=''>
					জেলা
				</option>
				{districts &&
					filteredDistricts.map((district) => (
						<option value={district.id} key={district.id}>
							{district.bn_name}
						</option>
					))}
			</select>

			{/* upazila */}
			<select
				defaultValue={upazila}
				onChange={(e) => {
					setUpazila(e.target.value);
				}}>
				<option disabled value=''>
					উপজেলা
				</option>
				{upazilas &&
					filteredUpazilas.map((district) => (
						<option value={district.id} key={district.id}>
							{district.bn_name}
						</option>
					))}
			</select>

			{/* Union */}
			<select
				defaultValue={union}
				onChange={(e) => {
					setUnion(e.target.value);
				}}>
				<option disabled value=''>
					ইউনিয়ন
				</option>
				{unions &&
					filteredUnions.map((district) => (
						<option value={district.id} key={district.id}>
							{district.bn_name}
						</option>
					))}
			</select>

			<button onClick={onSearch}>Search</button>
		</div>
	);
};

export default Search;
