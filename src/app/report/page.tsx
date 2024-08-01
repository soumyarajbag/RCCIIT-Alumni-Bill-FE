"use client";
import ReportTable from "@/components/ReportTable";
import { getReport } from "@/utils/functions/getReport";
import React, { useEffect, useState } from "react";

const page = () => {
  const [registrationData, setRegistrationData] = useState<any[]>([]);
  useEffect(() => {
    const getReportData = async () => {
      const data = await getReport();
      if (data) {
        setRegistrationData(data);
      }
    };
    getReportData();
  }, []);
  return (
    <div className="mx-auto flex my-10 min-h-[80vh] w-full flex-col items-center gap-5">
      <h1 className="text-center font-hollirood text-4xl font-semibold tracking-wider">
        Report Dashboard
      </h1>

      <ReportTable registrationData={registrationData} />
    </div>
  );
};

export default page;
