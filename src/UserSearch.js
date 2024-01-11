import React, { useState } from 'react';

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [userData, setUserData] = useState(null);
  const backendURL = 'http://comp-backend-env.eba-vujcmart.ap-northeast-2.elasticbeanstalk.com/auth'; // 백엔드 URL을 적절히 수정하세요

  const handleSearch = () => {
    // Fetch user data from the backend
    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: searchInput }),
    })
      .then(response => response.json())
      .then(data => {
        // Update state with the received data
        setUserData(data);
        setSearchResult(`찾은 내용: ${searchInput}`);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const handleAddFriend = () => {
    // TODO: Implement friend adding logic
    // 여기에 친구 추가 로직을 구현하세요
    // 예를 들어, 백엔드 API를 호출하여 친구 추가 요청을 보낼 수 있습니다.
    // 성공적으로 추가되었다는 메시지를 받으면 사용자에게 알림을 표시할 수 있습니다.
    alert('Friend added!');
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
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleAddFriend}>친구 추가</button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
