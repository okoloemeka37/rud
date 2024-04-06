import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios';

export default function users() {
  
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
useEffect(() => {
  getuser();

},[])



  const getuser=()=>{
    setLoading(true);
    axiosClient.get("/users")
    .then(({data})=>{
      setUsers(data.data);
      setLoading(false);
     })
     .catch(()=>{
      setLoading(false);
     })
  }

  const onDeleteClick =user=>{
   if (! confirm("Are You Sure You Want To Delete This User??" +user.name)) {
    
   }
   axiosClient.delete(`/users/${user.id}`).then(()=>{
    getuser()
   })
  }

  return (
    <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Users</h1>
          <Link className="btn-add" to="/users/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}
