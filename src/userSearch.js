import React, { useState } from 'react';

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [userData, setUserData] = useState(null);
  const backendURL = 'http://comp-backend-env.eba-vujcmart.ap-northeast-2.elasticbeanstalk.com/'; // 백엔드 URL을 적절히 수정하세요

  const handleSearch = () => {
    // Fetch user data from the backend
    fetch(backendURL+'friends/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targetUser: searchInput }),
    })
      .then(response => {
        if(response.status==(400||200)) //400으로 추후 수정
          return response.json()
        else 
          throw new Error('Internal server error');
      })
      .then(data => {
        // Update state with the received data
        setUserData(data);
        setSearchResult(`찾은 내용: ${searchInput}`);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const handleAddFriend = (userData) => {
    fetch(backendURL+'friends/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ person2: userData.msg }),
    })
      .then(response => {
        if(response.status==(409||200)) 
          return response.json()
        else 
          throw new Error('Internal server error');
      })
      .then(data => {        
        alert(`${data.msg}`);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  return (
    <div id="search-container">
      <h2>* 나의 친구 찾기 *</h2>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter name or email"
      />
      <button onClick={handleSearch}>Search</button>
      <div id="searchResult">{searchResult}</div>

      {userData && (
        <div>
          <h3>사용자 정보</h3>
          <p>아이디: {userData.msg}</p>
          <button onClick={()=>handleAddFriend(userData)}>친구 추가</button>
        </div>
      )}
    </div>

  );
};


export default UserSearch;
