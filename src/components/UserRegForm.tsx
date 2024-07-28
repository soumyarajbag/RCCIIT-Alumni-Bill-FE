"use client";
import { useUser } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormElement from "./FormElement";
import { supabase } from "@/lib/client";
import { clearSpaces, validateUserReg } from "@/utils/functions/validate";

const UserRegForm = () => {
  const user = useUser((state) => state.user);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    roll: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    roll: "",
    gender: "",
  });
  const router = useRouter();
  // console.log(inputs);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const validation = validateUserReg(inputs);
      const allFieldsEmpty = Object.values(validation).every(
        (value) => value === "",
      );
      if (allFieldsEmpty) {
        const { error } = await supabase
          .from("users")
          .update({
            name: inputs.name,
            phone: clearSpaces(inputs.phone).trim(),
            gender: inputs.gender,
            roll: inputs?.roll!,
          })
          .eq("id", user?.id);
        if (error) {
          error.message.includes("duplicate key value")
            ? toast.error("Phone number already registered")
            : toast.error("There was an error submitting the form");
          throw error;
        }
        // sendReferral();
        router.push("/bill");
        router.refresh();
        toast.success("Registration Successful");
      }
      if (!allFieldsEmpty) {
        setErrors(validation);
        toast.error("Fill all the fields accurately !");
        return;
      }
    } catch (error) {
      // console.log("Error occurred", { error });
    }
  };

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      name: user?.name!,
      phone: user?.phone!,
      roll: user?.roll!,
      gender: user?.gender!,
    }));
  }, [user]);

  return (
    <div className="flex w-full md:w-1/2 lg:w-1/3 flex-col justify-center gap-6  rounded-xl border border-regalia bg-body p-6 font-hollirood  md:py-10">
      <FormElement
        name="Name"
        value={inputs.name}
        type="text"
        id={"name"}
        width="100%"
        onChange={handleInputChange}
      />
      {errors.name && (
        <h1 className="text-xs font-semibold text-red-600">{errors.name}</h1>
      )}
      <div className="flex flex-row items-end gap-2">
        <div className="text-md rounded-xl border border-regalia bg-body px-2 py-1 font-semibold">
          +91
        </div>
        <FormElement
          name="Phone"
          value={inputs.phone}
          type="text"
          id={"phone"}
          width="100%"
          onChange={handleInputChange}
        />
      </div>

      {errors.phone && (
        <h1 className="text-xs font-semibold text-red-600">{errors.phone}</h1>
      )}
      <FormElement
        name="Email"
        value={user?.email!}
        type="text"
        id={"email"}
        disabled={true}
        width="100%"
        onChange={handleInputChange}
      />

      <FormElement
        name="College Roll"
        value={inputs.roll}
        type="text"
        id="roll"
        width="100%"
        onChange={handleInputChange}
      />
      <h1 className="-mt-4 text-center text-xs font-semibold text-red-400">
        Roll Only for College students.
      </h1>
      {errors.roll && (
        <h1 className="text-xs font-semibold text-red-600">{errors.roll}</h1>
      )}
      <div className="flex flex-row flex-wrap items-center px-3 font-semibold  md:gap-2">
        <label htmlFor="gender">Gender : </label>
        <div className="flex w-full flex-row flex-wrap items-center gap-10  max-md:justify-between  md:items-center md:gap-16 ">
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="male"
              className="bg-white text-regalia"
              checked={inputs.gender === "male"}
              onChange={handleInputChange}
              required={true}
            />
            Male
          </label>
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="female"
              className="bg-white text-regalia"
              checked={inputs.gender === "female"}
              onChange={handleInputChange}
              required={true}
            />
            Female
          </label>
        </div>
      </div>
      {errors.gender && (
        <h1 className="text-xs font-semibold text-red-600">{errors.gender}</h1>
      )}
      <button
        onClick={handleSubmit}
        className="mx-auto rounded-xl border border-regalia bg-[#c9a747] px-10 py-2 font-semibold text-black hover:bg-black hover:text-[#c9a747] md:w-1/3"
      >
        Submit
      </button>
      <Toaster position="bottom-right"  />
    </div>
  );
};

export default UserRegForm;