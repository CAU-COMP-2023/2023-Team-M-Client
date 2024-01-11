import React, { useState } from 'react';
import './Friendd.css';

function App() {
  const friendData = [
    { id: 1, name: '친구1', description: '아이디, 이메일' },
    { id: 2, name: '친구2', description: '아이디, 이메일' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  /*function App() {
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      // 예시 API 호출
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => // 데이터에서 필요한 정보만 추출하여 저장
        const formattedData = data.map(({ id, name, email }) => ({
          id,
          name,
          email,
        }));
        setFriends(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
    */

  const filteredFriends = friendData.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div id="header">
        My Friends
      </div>

      <div id="search-bar">
        <input
          type="text"
          placeholder="친구 찾기"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm('')}>RESET</button>
      </div>

      <div id="friend-list">
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="friend-card">
            <h2>{friend.name}</h2>
            <p>{friend.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
