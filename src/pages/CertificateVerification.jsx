import { useState } from "react";

const CertificateVerification = () => {
  const [refid, setRefid] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInput = (msg) => {
    setRefid("");
    setResult(<p className="text-red-600">{msg}</p>);
  };

  const verifyCertificate = async () => {
    if (refid.length !== 15) {
      clearInput("Enter a valid 15 digit Reference ID");
      return
    }

    setLoading(true);
    setResult(<p className="text-blue-600">Loading...</p>);

    try {
      const url = `https://kalki-certificates-202425.vercel.app/${refid}/info.json`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) throw new Error("NOT_FOUND");
        if (response.status === 500) throw new Error("SERVER_ERROR");
        throw new Error("UNKNOWN_ERROR");
      }

      const data = await response.json();

      if (data) {
        setResult(
          <div className="text-gray-800 text-center mt-6">
            <h3 className="font-bold text-xl mb-[5px]">Name : <span className="text-blue-800"> {data.std_name}</span> </h3>
            <p className="text-lg font-medium mb-[5px] text-gray-800">Registration Number : {data.regNo}</p>
            <p className="text-lg font-medium mb-[5px] text-gray-800">Department Name : <span className="text-pink-500">{data.dep_name}</span> </p>
            <p className="text-lg font-medium mb-[5px] text-gray-800">Position : <span className="text-green-600">{data.position}</span> </p>
          </div>
        );
        setRefid("");
      } else {
        clearInput("Certificate not found");
      }
    } catch (err) {
      if (err.message === "NOT_FOUND") {
        clearInput("Certificate not found");
      } else if (err.message === "SERVER_ERROR") {
        clearInput("Server error. Please try again later.");
      } else {
        clearInput("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 sm:py-7 text-center">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">
          <span className="text-blue-800">Verify</span> Certificate
        </h1>

        <input
          type="text"
          value={refid}
          onChange={(e) => setRefid(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="Enter Reference ID"
          className="w-4/5 border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={verifyCertificate}
          className="bg-blue-800 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="mt-4">{result}</div>
      </div>
    </div>
  );
};

export default CertificateVerification;
