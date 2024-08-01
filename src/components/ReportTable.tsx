import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { PuffLoader } from "react-spinners";

import Link from "next/link";
import FormElement from "./FormElement";

const ReportTable = ({ registrationData }: { registrationData: any[] }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    bill_no: "",
    name: "",
    stream: "",
    college_id: "",
    phone: "",
    email: "",
    mode: "",
    transaction_id: "",
    date: "",
    receiver: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoadingSearch(true);
    const filteredResults = registrationData.filter(
      (registration: any) =>
        registration.bill_no.toString().includes(inputs.bill_no.toString()) &&
        registration.phone.includes(inputs.phone) &&
        registration.name.toLowerCase().includes(inputs.name.toLowerCase()) &&
        registration.transaction_id
          .toLowerCase()
          .includes(inputs.transaction_id.toLowerCase()) &&
        registration.college_id
          .toLowerCase()
          .includes(inputs.college_id.toLowerCase()) &&
          registration.stream.toLowerCase().includes(inputs.stream.toLowerCase()) &&
        registration.phone.toLowerCase().includes(inputs.phone.toLowerCase()) &&
        registration.email.toLowerCase().includes(inputs.email.toLowerCase()) &&
        registration.payment_mode
          .toLowerCase()
          .includes(inputs.mode.toLowerCase()) &&
        registration.date.toLowerCase().includes(inputs.date.toLowerCase()) &&
        registration.receiver
          .toLowerCase()
          .includes(inputs.receiver.toLowerCase())
    );
    setFilteredResults(filteredResults);
    setLoadingSearch(false);
  }, [inputs, registrationData]);
  return (
    <>
      <div className="flex w-[90%] flex-row flex-wrap items-center justify-center gap-5  md:w-full">
        <FormElement
          name="Bill No."
          value={inputs.bill_no}
          type="number"
          id="bill_no"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Name"
          value={inputs.name}
          type="text"
          id="name"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Stream"
          value={inputs.stream}
          type="text"
          id="stream"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="College ID"
          value={inputs.college_id}
          type="text"
          id="college_id"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Phone"
          value={inputs.phone}
          type="number"
          id="phone"
          onChange={handleInputChange}
          width="1/3"
        />

        <FormElement
          name="Payment Mode"
          value={inputs.mode}
          type="text"
          id="mode"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Transaction ID"
          value={inputs.transaction_id}
          type="text"
          id="transaction_id"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Date"
          value={inputs.date}
          type="text"
          id="date"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Receiver"
          value={inputs.receiver}
          type="text"
          id="receiver"
          onChange={handleInputChange}
          width="1/3"
        />
      </div>
      {loadingSearch ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <PuffLoader size={40} color="#c9a747" />{" "}
        </div>
      ) : filteredResults?.length == 0 ? (
        <h1 className="mx-auto mt-20 flex w-full flex-col items-center justify-center font-hollirood text-2xl font-semibold tracking-wider text-red-600">
          No Such Registrations Available !
        </h1>
      ) : (
        <div className="mx-auto w-full overflow-x-auto px-3">
          <table className="w-full table-auto border border-gray-300 rounded-xl font-hollirood leading-8 tracking-widest">
            <thead>
              <tr className="text-center">
                <th>Sl. No.</th>
                <th>Bill No.</th>
                <th>Name</th>
                <th>Stream</th>
                <th>College ID</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Mode</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Receiver</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                filteredResults.map((registration: any, index: number) => (
                  <tr
                    key={index}
                    className={
                      "bg-green-100 text-green-500 font-semibold text-center"
                    }
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration?.bill_no}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.stream.toUpperCase()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.college_id.toUpperCase()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.payment_mode!}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration?.transaction_id!}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration?.date!}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.receiver}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ReportTable;
