import React, { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const UserSearch = ({ userList, setUsername }) => {
	const [searchValue, setSearchValue] = useState('');
  	const [filteredUsers, setFilteredUsers] = useState([]);
  	const [viewHints, setViewHints] = useState(false);

  	useEffect(() => {
	    setFilteredUsers( userList.filter(user => user?.username?.toLowerCase().includes(searchValue.toLowerCase())) ); // seach of similar by lower case username
  	}, [searchValue, userList]);

  	const handleSearch = (event) => { //update searchValue
	    const value = event.target.value;
	    setSearchValue(value);                
	};

	const handleInputClick = (event) => { //hide and open hints on users from channel
	    setViewHints(viewHints ? false : true);
	};

	return (
		<div>
	      <Form.Control
	      	className="d-flex"
	        type="text"
	        placeholder="Search users..."
	        value={searchValue}
	        onChange={handleSearch}
	        onClick={handleInputClick}
	        style={{width: "500px"}}
	      />
	      {/* if found at least one user show list */}
	      {filteredUsers.length > 0 && viewHints && (
	        <ListGroup className="mt-1 position-absolute" style={{width: "500px"}}>
	          {filteredUsers.map((user, index) => (
	            <ListGroup.Item key={index}>
	              {user.username}
	            </ListGroup.Item>
	          ))}
	        </ListGroup>
	      )}

	    </div>
  	);
};

export default UserSearch;
