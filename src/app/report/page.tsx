"use client";
import ReportTable from "@/components/ReportTable";
import { getReport } from "@/utils/functions/getReport";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const page = () => {
  const [registrationData, setRegistrationData] = useState<any[]>([]);
  const [downloadableCSV, setDownloadableCSV] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getReportData = async () => {
      const data = await getReport();
      if (data) {
        setRegistrationData(data);
        const refinedData = data.map((obj) => {
          return {
            "Bill No.": obj.bill_no,
            Name: obj.name,
            Stream: obj.stream,
            Email: obj.email,
            Phone: obj.phone,
            "College ID": obj.college_id,
            "Payment Mode": obj.payment_mode,
            "Transaction ID": obj.transaction_id,
            "Receiver Name": obj.receiver,
            Date: obj.date,
            Amount: 1000,
            Year: obj.year,
          };
        });
        setCsvData(refinedData);
        setDownloadableCSV(true);
      }
    };
    getReportData();
  }, []);
  return (
    <div className="mx-auto flex my-10 min-h-[80vh] w-full flex-col items-center gap-5">
      <div className="flex flex-row items-center justify-center gap-5">
        <button
          onClick={() => {
            router.push("/bill");
          }}
          className="bg-sky-500 text-white px-4 py-1 rounded-lg"
        >
          Bill
        </button>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-sky-500 text-white px-4 py-1 rounded-lg"
        >
          Home
        </button>
        <button
          onClick={() => {
            router.push("/profile");
          }}
          className="bg-sky-500 text-white px-4 py-1 rounded-lg"
        >
          Profile
        </button>
      </div>
      <h1 className="text-center font-hollirood text-4xl font-semibold tracking-wider">
        Report Dashboard
      </h1>
      {downloadableCSV && (
        <CSVLink
          data={csvData}
          filename={`report-${new Date().toDateString()}.csv`}
          className="bg-sky-500 text-white px-4 py-1 rounded-lg"
        >
          Download CSV
        </CSVLink>
      )}
      <ReportTable registrationData={registrationData} />
    </div>
  );
};

export default page;
