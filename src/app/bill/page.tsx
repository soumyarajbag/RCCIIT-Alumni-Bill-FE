"use client";
import { useEffect, useState } from "react";
import FormElement from "@/components/FormElement";
import { ClipLoader } from "react-spinners";
import SelectInput from "@/components/SelectInput";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/client";
import { useUser } from "@/lib/store/user";
import { getUserInfo } from "@/utils/functions/getUserInfo";

export default function Home() {
  const [inputs, setInputs] = useState({
    bill_no: "",
    name: "",
    stream: "",
    college_id: "",
    email: "",
    phone: "",
    payment_mode: "",
    transaction_id: "",
    note: "",
    receiver: "",
    date: formatDate(new Date().toLocaleDateString()),
  });
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const areAnyFieldsEmpty = () => {
      console.log(inputs);
      return (
        inputs.name === "" ||
        inputs.stream === "" ||
        inputs.college_id === "" ||
        inputs.email === "" ||
        inputs.phone === "" ||
        inputs.payment_mode === "" ||
        inputs.transaction_id === "" ||
        inputs.date === ""
      );
    };
    setIsDisabled(areAnyFieldsEmpty());
  }, [inputs]);

  const router = useRouter();
  const user: any = useUser((state) => state.user);
  useEffect(() => {
    setInputs((prevInputs: any) => {
      return {
        ...prevInputs,
        receiver: user?.name!,
      };
    });
  }, [user]);

  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    const readUserSession = async () => {
      const userData = await getUserInfo();
      setUser(userData);
    };
    if (!user && !user?.name!) {
      readUserSession();
    }
  }, []);
  const handleSubmit = async () => {
    try {
      console.log(isDisabled);
      console.log(inputs);
      if (isDisabled) {
        toast.error("Please fill all the fields");
        return;
      }
      setIsSubmitted(false);
      await getData();
      const pushData = {
        bill_no: inputs.bill_no.toString(),
        receiver_id: user?.id,
        name: inputs.name,
        year: "2024-2025",
        stream: inputs.stream,
        college_id: inputs.college_id,
        email: inputs.email,
        phone: inputs.phone,
        payment_mode: inputs.payment_mode,
        transaction_id: inputs.transaction_id,
        note: inputs.note !== "" ? inputs.note : "N/A",
        receiver: user?.name,
        date: inputs.date,
      };

      // Sending data to the backend using POST method
      const response = await fetch(
        "https://rcciit-alumni-bill-generator-server.onrender.com/generate-bill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pushData),
        }
      );

      // Handle the response
      const result = await response.json();

      // Save data to Supabase
      if (response?.ok) {
        const { data, error } = await supabase.from("bill").insert(pushData);
        console.log(data, error);
      }
      await getData();
      setInputs((prevInputs: any) => {
        return {
          ...prevInputs,
          name: "",
          stream: "",
          college_id: "",
          email: "",
          phone: "",
          payment_mode: "",
          transaction_id: "",
          note: "",
          receiver: "",
        };
      });
    } catch (e) {
      console.error(e);
    }
    setIsSubmitted(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const getData = async () => {
    const { data, error }: { data: any; error: any } = await supabase
      .from("bill")
      .select("*")
      .order("bill_no", { ascending: true });
      console.log(data)
    setInputs((prevInputs: any) => {
      return {
        ...prevInputs,
        bill_no:
          parseInt(data?.length > 0 && data[data.length - 1]?.bill_no) + 1 ||
          "",
      };
    });
  };
  useEffect(() => {
    getData();
  }, []);
  function formatDate(inputDate: any) {
    const dateParts = inputDate.split("/");
    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = dateParts[2];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getOrdinal = (n: any) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDay = getOrdinal(day);
    const formattedMonth = monthNames[month - 1];

    return `${formattedDay} ${formattedMonth} ${year}`;
  }
  return (
    <main>
      <div className="mx-auto flex w-full flex-col items-start  justify-center gap-5 px-2 py-10">
        <div className="flex flex-row items-center w-full mx-auto gap-3 justify-center">
          <h1 className="w-full text-center font-hollirood text-2xl font-semibold tracking-wider text-regalia">
            Add Bill
          </h1>
          <button
            onClick={() => {
              router.push("/profile");
            }}
            className="bg-sky-500 text-white px-4 py-1 rounded-lg"
          >
            Profile
          </button>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="bg-sky-500 text-white px-4 py-1 rounded-lg"
          >
            Home
          </button>
        </div>
        <Toaster position="bottom-right" />
        <div className="mx-auto w-full max-w-md px-4">
          <div className="mx-auto flex w-full flex-col justify-center gap-5">
            <FormElement
              id="bill_no"
              name="Bill No"
              type="text"
              value={inputs?.bill_no}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="name"
              name="Name"
              type="text"
              value={inputs?.name}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="stream"
              name="Stream"
              type="text"
              value={inputs?.stream}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="college_id"
              name="College ID"
              type="text"
              value={inputs?.college_id}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="email"
              name="Email"
              type="text"
              value={inputs?.email}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="phone"
              name="Phone"
              type="text"
              value={inputs?.phone}
              onChange={handleInputChange}
              width="100%"
            />
            <SelectInput
              options={[
                "UPI PAYMENT",
                "DEBIT CARD",
                "CREDIT CARD",
                "GOOGLE PAY",
                "IDFC BANK",
                "PHONE PE",
                "NET BANKING",
                "CASH",
                "BANK TRANSFER",
              ]}
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={inputs.payment_mode}
              name={"Payment Mode"}
              id={"payment_mode"}
            />
            <FormElement
              id="transaction_id"
              name="Transaction ID"
              type="text"
              value={inputs?.transaction_id}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="note"
              name="Note"
              type="text"
              placeholder="Optional"
              value={inputs?.note}
              onChange={handleInputChange}
              width="100%"
            />
            {/* <SelectInput
              options={["DEEP DAS", "ARIYAN BHAKAT"]}
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={inputs.receiver}
              name={"Receiver"}
              id={"receiver"}
            /> */}
            <FormElement
              id="receiver"
              name="Receiver"
              type="text"
              disabled
              value={user?.name!}
              onChange={handleInputChange}
              width="100%"
            />
            <FormElement
              id="date"
              name="Date"
              type="text"
              disabled
              value={inputs?.date}
              onChange={handleInputChange}
              width="100%"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isSubmitted}
          className={`mx-auto w-1/2 rounded-full border-2 border-[#c9a747] px-2 py-1 font-semibold text-black hover:border-[#c9a747] hover:bg-black hover:text-[#c9a747] md:w-1/3 md:text-xl ${
            !isSubmitted ? "bg-black text-[#c9a747]" : "bg-[#c9a747] text-black"
          } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isSubmitted ? "Submit" : <ClipLoader color="#c9a747" size={20} />}
        </button>
      </div>
    </main>
  );
}
