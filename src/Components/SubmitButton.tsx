import React from "react";

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
  <button
    type="submit"
    className={`bg-blue-500 text-white p-2 rounded flex items-center justify-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    disabled={isLoading}
  >
    {isLoading ? (
      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.707-1.707C8.098 15.882 8 15.455 8 15H4c0 1.177.392 2.26 1.052 3.139l1.948-1.848z"></path>
      </svg>
    ) : (
      "Check URL"
    )}
  </button>
);
