import React from 'react';
import unionNames from './news/data.json';

export default function Union({ upazilla, union, setUnion }) {
    const unionArray = unionNames[upazilla];

    function setUnionFunc(e) {
        setUnion(e.target.value);
    }

    return (
        <>
            <select name='union' id='union' value={union} onChange={setUnionFunc}>
                <option value="">ইউনিয়ন</option>
                {unionArray && unionArray.map((unions) => (
                    <option value={unions} key={Math.random()}>
                        {unions}
                    </option>
                ))}
            </select>
        </>
    );
}