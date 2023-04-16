import HeaderDriver from "./headerRider";
import './headerRider'

function AllRoutesRider() {
  // TODO: get data from database
  return (
    <div>
      <HeaderDriver></HeaderDriver>
      <div className="routes-div">
      <h3>All existing routes</h3>
      <table className="routes-table">
        <thead>
          <th>Origin</th>
          <th>Destination</th>
          {/* <tr>
            {Object.keys(data[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr> */}
        </thead>
        <tbody>
          <tr>
            <td>LA</td>
            <td>NY</td>
          </tr>
          <tr>
            <td>Denver</td>
            <td>NY</td>
          </tr>
          {/* {data.map(item => (
            <tr key={item.id}>
              {Object.keys(item).map(key => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))} */}
        </tbody>
      </table>
      </div>
    </div>
  );
}
  
  export default AllRoutesRider;
  