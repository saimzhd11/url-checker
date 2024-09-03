import React from "react";

interface URLInputProps {
  error?: { message?: string };
  touched?: boolean;
  register: any;
}

export const URLInput: React.FC<URLInputProps> = ({ error, touched, register }) => (
  <>
    <input
      {...register}
      type="text"
      placeholder="Enter URL"
      className={`text-black border p-2 w-full ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {touched && error && <p className="text-red-500">{error.message}</p>}
  </>
);
