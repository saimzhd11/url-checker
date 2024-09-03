import React from "react";

interface StatusMessageProps {
  urlStatus: string | null;
  isLoading: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ urlStatus, isLoading }) => {
  if (isLoading || !urlStatus) {
    return null;
  }

  return <p className="mt-4">{urlStatus}</p>;
};
