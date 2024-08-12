"use client";
import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface IErrorStateProps {
  error: Error;
}
const ErrorState = ({ error }: IErrorStateProps) => {
  useEffect(() => {
    console.log(error)
  }, [error]);
  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;