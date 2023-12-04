// import Base from "./Base";
// import {Table} from "reactstrap";
// import {Switch} from "@mui/material";
// import {useEffect, useState} from "react";
// import {getUserListForAdmin} from "../service/userservice";
//
// export const UsersListForAdmin = () => {
//
//     const [approve, setApprove] = useState({
//         userId: '',
//         payment_status: ''
//     });
//
//     const [userSwitches, setUserSwitches] = useState(false);
//
//     const handleChange = (userId) => {
//         setUserSwitches((prevSwitches) => ({
//             ...prevSwitches,
//             [userId]: !prevSwitches[userId],
//         }));
//
//         setApprove({
//             userId: userId,
//             payment_status: true
//         });
//     };
//
//     const [checked, setChecked] = useState(false);
//
//     // const handleChange = (event) => {
//     //     setChecked(event.target.checked);
//     // };
//
//     const [usersList, setUsersList] = useState([]);
//
//     useEffect(() => {
//         getUserListForAdmin()
//             .then(response => {
//                 setUsersList(response);
//                 if (response.payment_status === '1') {
//                     setUserSwitches(response.user_id)
//                 }
//             }).catch(error => {
//             console.log(error);
//         })
//     }, [])
//     return (
//         <Base>
//             <div className="mt-5 border-5">
//                 {JSON.stringify(usersList)}
//                 {JSON.stringify(approve)}
//                 <Table
//                     responsive
//                     striped
//                     bordered
//                 >
//                     <thead className="table-heading">
//                     <tr>
//                         <th>
//                             Sr #
//                         </th>
//                         <th>
//                             Name
//                         </th>
//                         <th>
//                             Room Type
//                         </th>
//                         <th>
//                             Phone #
//                         </th>
//                         <th>
//                             Payment
//                         </th>
//                         <th>
//                             Payment Status
//                         </th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {usersList &&
//                         usersList.map(user => (
//                             <tr>
//                                 <th scope="row">
//                                     {user.id}
//                                 </th>
//                                 <td>{user.room_type}</td>
//                                 <td>{user.username}</td>
//                                 <td>
//                                     <Switch
//                                         checked={userSwitches[user.id] || false}
//                                         onChange={() => handleChange(user.id)}
//                                         inputProps={{'aria-label': 'controlled'}}
//                                         disabled={userSwitches[user.id]}
//                                     />
//                                 </td>
//                                 <td>
//                                     {userSwitches[user.id] ? 'Approved' : 'Pending'}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </div>
//         </Base>
//     )
// }