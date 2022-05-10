import React from "react"
import "./homepage.css"
import {MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBContainer} from "mdb-react-ui-kit";
import axios from "axios";

const Homepage = ({setLoginUser}) => {


    const [data,setData] = useState([]);

    useEffect(() => {
      loadUsersData()
    }, []);
  
    const loadUsersData = async () => {
      return await axios.get("http://localhost:9002/Teacher").then((respond) => setData(respond.data)).catch((err) => console.log(err));
  
    };
    console.log("data", data);
  
    const [ user, setLoginUser] = useState({})

//nkjjub

    const [sortValue, setSortValue] = useState("");

    const sortOptions = ["name", "email", "phone", "class teacher"];

    const handlenReset = () => {
        loadUserData();
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.get('http://localhost:9002/Teacher?q=${value}')
        .then((responce) => {
          setData(responce.data);
        setValue("");
        })
          .catch((err) => console.log(err));
    };
    const handleSort = async (e) => {
        let value = e.target.value;
        return await axios.get('http://localhost:9002/Teacher?_sort=${value}&_order=asc')
        .then((responce) => {
          setData(responce.data);
        
        })
          .catch((err) => console.log(err));
    };
    return (
        <MDBContainer>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
            }}
            className="d-flex input-group w-auto"
            onSubmit={handleSearch}
            >
                <input
                type="text"
                className="form-control"
                placeholder="Search Name ..."
                value={value}
                onChange={(e) => setValur(e.target.value)}
                />
                <MDBBtnGroup>
                    <MDBtn type="submit" color="dark">Search</MDBtn>
                    <MDBtn className="mx-2" color="info" onClick={() => handlenReset()}>Reset</MDBtn>
                </MDBBtnGroup>
            </form>

        <div style={{marginTop: "100px"}}>
            <h2>In our School Teacher's Data</h2>
        <MDBRow>
            <MDBCol size="12">
                <MDBTable>
                    <MDBTableHead dark>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name.</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Class Teacher</th>
                        </tr>
                    </MDBTableHead>
                    {data.length === 0 ? (
                        <MDBTableBody className="align-center mb-0">
                            <tr>
                                <td colSpan={8} className="text-center mb-0">NO data Found</td>
                            </tr>
                        </MDBTableBody>

                    ): (
                        data.map((item, index) => (
                            <MDBTableBody key={index}>
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.classteacher}</td>
                                
                            </tr>
                            
                            </MDBTableBody>
                        ))
                    )}
                </MDBTable>
            </MDBCol>
        </MDBRow>
        </div>
             <MDBRow>
                <MDBCol size="8"><h3>Sort By:</h3>
                <select style={{width: "50%" , borderRadius: "2px", height: "35px" }}
                onChange={handleSort}
                value={sortValue}>

                <option>Please Select Value</option>
                {sortOptions.map((item, index) => (
                    <option value={item} key={index}>
                    {item}
                    </option>
                ))}
                
                    
                </select>
                </MDBCol>
                <MDBCol size="4"><h4>Filter By Status:</h4></MDBCol>
             </MDBRow>               
        </MDBContainer>
    )
}

export default Homepage