import React, { useState } from 'react';
import './Friendd.css';

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [userData, setUserData] = useState(null); 
 /*const backendURL = 'http://~~'*/

  const handleSearch = () => {

    /*만약 백엔드 완료되면.. 여기서부터*/

    const dummyUserData = {
      username: 'User',
      email: 'user@example.com',
    };

    setUserData(dummyUserData);

    setSearchResult(`찾은 내용: ${searchInput}`);
  };

  const handleAddFriend = () => {
    
    alert('Friend added!');
  };
  /*여기까지 삭제 후*/

  /*아래 내용 입력해보기(작동되는지 확인 필요)
    fetch(backendUrl, {
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
    alert('Friend added!');
  };
  여기까지*/

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