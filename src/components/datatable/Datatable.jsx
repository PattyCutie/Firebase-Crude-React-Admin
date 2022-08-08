import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatableSource";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { reauthenticateWithRedirect } from "firebase/auth";

/*const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params)=> {
      return (
      <>
      <span>{params.row.lastName}</span>
      <p>{params.row.age}</p>
      </>
    )}
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
*/

const Datatable = () => {
  //const [ data, setData ] = useState(userRows)
  //fetch data collection from firebase
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = []
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"))
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data()})
    //     })
    //     setData(list)
    //     //console.log(list)
    //   } catch(err) {
    //     console.log(err)
    //   }
    // }
    // fetchData()
    // instead fetching data only one time, we can use Listen to realtime database by call onSnapshot()
    const unsub = onSnapshot(collection(db, "users"), (snapShot) =>{
      let list =[]
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setData(list)
    }, (err) => {
       console.log(err)
    })
    // Clean up
    return () => {
      unsub();
    }
  }, [])

  console.log(data)

  //delete user
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id))
      setData(data.filter((item) => item.id !== id));
    } catch(err) {
      console.log(err)
    }
  };

  //manage list
  const actionColumn = [
    {
      field: "action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" className="link">
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)} //concat will combind arrays
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
