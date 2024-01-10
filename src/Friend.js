import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Friend = (props) => {
    const [searchInput, setSearchInput] = useState({ searchEmail: '' });
    const { searchEmail } = searchInput;

    const inputOnChange = function (e) {
        const { name, value } = e.target;
        setSearchInput({ ...searchInput, [name]: value });
    };

    const userSearchFn = function () {
        axios.get(`URL_HERE/${Number(searchEmail)}`)  // URL_HERE에 실제 URL을 입력하세요
            .then(res => {
                const user = res.data.result;
                setSearchList(user);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const [searchList, setSearchList] = useState(null);

    const [ListRefSwitch, setListRefSwitch] = useState(false);

    useEffect(() => {
        if (searchList !== null) {
            setListRefSwitch(!ListRefSwitch);
        }
    }, [searchList, setListRefSwitch]);

    const listRef = React.createRef();

    return (
        <section ref={listRef} className="item-list">
            {
                ListRefSwitch ?
                    <li className='item'>
                        <div className='meta-data'>
                            <img src={props.basicImg} alt={props.basicImg} />
                            {
                                searchList !== null ? <p>{searchList.name}</p> : null
                            }
                        </div>
                        {/* setPlusModalSwitch, PlusModalSwitch의 정의가 필요합니다 */}
                        {/* <i onClick={() => { setPlusModalSwitch(!PlusModalSwitch); }} className="fas fa-plus"></i> */}
                    </li>
                    : null
            }
        </section>
    );
}

export default Friend;
