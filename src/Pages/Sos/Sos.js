import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function Sos() {
  const [sosList, setSosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSosList();
  }, []);
  const token = sessionStorage.getItem("adminToken");

  const fetchSosList = async () => {
    try {
      setLoading(true);
      console.log(token)
      const res = await axios.get("http://localhost:8080/api/v1/admin/getSos",
        { headers: { token, } }
      );
      setSosList(res.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching SOS:", error);
      setError("Failed to load SOS data");
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">SOS Alerts</h2>

      {sosList.length === 0 ? (
        <p className="text-center p-4">No SOS alerts found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left border-b">User</th>
                <th className="py-2 px-4 text-left border-b">Location</th>
                <th className="py-2 px-4 text-left border-b">Coordinates</th>
                <th className="py-2 px-4 text-left border-b">Time</th>
                {/* <th className="py-2 px-4 text-center border-b">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {sosList.map((sos) => (
                <tr key={sos._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {sos.userId?.name || sos.userId?._id || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {sos.locationName || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {sos.latitude?.toFixed(6)}, {sos.longitude?.toFixed(6)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(sos.time || sos.createdAt)}
                  </td>
                  {/* <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(sos._id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Sos;